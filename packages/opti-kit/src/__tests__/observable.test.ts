import { describe, it, expect, vi } from 'vitest';
import {
  Observable,
  Subject,
  BehaviorSubject,
  of,
  from,
  mapObservable,
  filterObservable,
  takeObservable
} from '../observable';

describe('Observable Reactive Streams', () => {
  it('should emit values from of() and complete', () => {
    const values: number[] = [];
    let completed = false;

    of(1, 2, 3).subscribe({
      next: (val) => values.push(val),
      complete: () => { completed = true; }
    });

    expect(values).toEqual([1, 2, 3]);
    expect(completed).toBe(true);
  });

  it('should convert Promises and Iterables with from()', async () => {
    const promiseVal = await new Promise<string>((resolve) => {
      from(Promise.resolve('optikit-stream')).subscribe((val) => resolve(val));
    });
    expect(promiseVal).toBe('optikit-stream');

    const arrayVals: number[] = [];
    from([10, 20, 30]).subscribe((val) => arrayVals.push(val));
    expect(arrayVals).toEqual([10, 20, 30]);
  });

  it('should pipe through map, filter, and take operators', () => {
    const emitted: number[] = [];

    of(1, 2, 3, 4, 5, 6)
      .pipe(
        filterObservable((n) => n % 2 === 0),
        mapObservable((n) => n * 10),
        takeObservable(2)
      )
      .subscribe((val) => emitted.push(val));

    expect(emitted).toEqual([20, 40]);
  });

  it('should broadcast to multiple observers with Subject', () => {
    const subject = new Subject<string>();
    const observer1: string[] = [];
    const observer2: string[] = [];

    subject.subscribe((v) => observer1.push(v));
    subject.next('Event 1');

    subject.subscribe((v) => observer2.push(v));
    subject.next('Event 2');

    expect(observer1).toEqual(['Event 1', 'Event 2']);
    expect(observer2).toEqual(['Event 2']);
  });

  it('should retain current value and replay to new subscribers with BehaviorSubject', () => {
    const bs = new BehaviorSubject<number>(100);
    expect(bs.value).toBe(100);

    const received: number[] = [];
    bs.subscribe((v) => received.push(v));

    bs.next(200);
    expect(bs.value).toBe(200);

    const lateReceived: number[] = [];
    bs.subscribe((v) => lateReceived.push(v));

    expect(received).toEqual([100, 200]);
    expect(lateReceived).toEqual([200]);
  });
});
