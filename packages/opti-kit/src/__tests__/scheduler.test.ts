import { describe, it, expect, vi } from 'vitest';
import {
  createPriorityQueue, createTaskQueue, createJobScheduler, scheduleOnce,
  scheduleInterval, cancelJob, pauseScheduler, resumeScheduler,
  createDeadLetterQueue, createCircuitBreaker, createBulkhead,
  createSemaphore, createMutex, createBarrier, createCountDownLatch,
  deferPromise, withTimeout, timeoutPromise, cancellablePromise,
  coalesceCalls, batchCalls, debounceAsync, throttleAsync,
} from '../scheduler';

describe('Scheduler & Concurrency Pro', () => {
  it('supports PriorityQueue, TaskQueue, DLQ, CircuitBreaker, Bulkhead', async () => {
    const pq = createPriorityQueue<string>();
    pq.push('low', 10);
    pq.push('high', 1);
    pq.push('mid', 5);
    expect(pq.peek()).toBe('high');
    expect([pq.pop(), pq.pop(), pq.pop()]).toEqual(['high', 'mid', 'low']);

    const tq = createTaskQueue(2);
    const res = await Promise.all([
      tq.enqueue(async () => 1),
      tq.enqueue(async () => 2),
      tq.enqueue(async () => 3),
    ]);
    expect(res).toEqual([1, 2, 3]);

    const dlq = createDeadLetterQueue<string>();
    dlq.push('job1', new Error('fail'));
    expect(dlq.size).toBe(1);
    expect(dlq.drain().length).toBe(1);
    expect(dlq.size).toBe(0);

    const cb = createCircuitBreaker({ failureThreshold: 2, resetTimeoutMs: 50 });
    await expect(cb.execute(async () => { throw new Error('err1'); })).rejects.toThrow();
    await expect(cb.execute(async () => { throw new Error('err2'); })).rejects.toThrow();
    expect(cb.state).toBe('open');
    await expect(cb.execute(async () => 'ok')).rejects.toThrow(/OPEN/);
    cb.reset();
    expect(await cb.execute(async () => 'ok')).toBe('ok');

    const bh = createBulkhead(1, 2);
    expect(await bh.execute(async () => 42)).toBe(42);
  });

  it('supports Semaphore, Mutex, Barrier, Latch, and async combinators', async () => {
    const sem = createSemaphore(2);
    const r1 = await sem.acquire();
    expect(sem.available).toBe(1);
    r1();
    expect(sem.available).toBe(2);

    const mtx = createMutex();
    expect(await mtx.runExclusive(async () => 'locked')).toBe('locked');

    const barrier = createBarrier(2);
    const bRes = await Promise.all([barrier.wait(), barrier.wait()]);
    expect(bRes.length).toBe(2);

    const latch = createCountDownLatch(2);
    latch.countDown();
    latch.countDown();
    await latch.await();
    expect(latch.count).toBe(0);

    const d = deferPromise<number>();
    d.resolve(7);
    expect(await withTimeout(d.promise, 100)).toBe(7);
    await timeoutPromise(1);

    const c = cancellablePromise(async (isCancelled) => (isCancelled() ? 'no' : 'yes'));
    c.cancel();
    expect(await c.promise).toBe('yes');

    const spy = vi.fn(async (x: number) => x * 2);
    const coalesced = coalesceCalls(spy);
    const [a, b] = await Promise.all([coalesced(5), coalesced(5)]);
    expect(a).toBe(10);
    expect(b).toBe(10);
    expect(spy).toHaveBeenCalledTimes(1);

    const batched = batchCalls(async (items: number[]) => items.map((x) => x + 1), 5);
    expect(await Promise.all([batched(1), batched(2)])).toEqual([2, 3]);

    const debounced = debounceAsync(async (x: number) => x * 3, 5);
    expect(await debounced(4)).toBe(12);

    const throttled = throttleAsync(async (x: number) => x + 10, 50);
    expect(await throttled(5)).toBe(15);
  });

  it('supports JobScheduler and timer helpers', async () => {
    const sched = createJobScheduler();
    let count = 0;
    sched.scheduleOnce('j1', 5, () => { count++; });
    pauseScheduler(sched);
    resumeScheduler(sched);
    expect(cancelJob(sched, 'j1')).toBe(true);
    const stopOnce = scheduleOnce(1, () => {});
    stopOnce();
    const stopInt = scheduleInterval(10, () => {});
    stopInt();
    sched.cancelAll();
    expect(count).toBe(0);
  });
});
