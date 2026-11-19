import { describe, it, expect, vi } from 'vitest';
import { createPipeline } from '../pipeline';

describe('Workflow Pipeline and Saga Compensation', () => {
  it('should run sequential steps updating context', async () => {
    interface OrderCtx {
      orderId?: string;
      total?: number;
      isPaid?: boolean;
    }

    const pipeline = createPipeline<OrderCtx>()
      .step('initOrder', () => ({ orderId: 'ORD-101', total: 100 }))
      .step('applyDiscount', (ctx) => ({ total: (ctx.total || 0) * 0.9 }))
      .step('pay', () => ({ isPaid: true }));

    const res = await pipeline.run();

    expect(res.success).toBe(true);
    expect(res.context.orderId).toBe('ORD-101');
    expect(res.context.total).toBe(90);
    expect(res.context.isPaid).toBe(true);
    expect(res.completedSteps).toEqual(['initOrder', 'applyDiscount', 'pay']);
  });

  it('should trigger retry on temporary failure and succeed', async () => {
    let attempts = 0;
    const pipeline = createPipeline<{ attempts: number }>()
      .step(
        'unstableStep',
        () => {
          attempts++;
          if (attempts < 2) {
            throw new Error('Temporary glitch');
          }
          return { attempts };
        },
        { retries: 2 }
      );

    const res = await pipeline.run({ attempts: 0 });
    expect(res.success).toBe(true);
    expect(res.context.attempts).toBe(2);
  });

  it('should run Saga compensation handlers in reverse when step fails', async () => {
    const compensationLog: string[] = [];

    const pipeline = createPipeline<{ balance: number }>()
      .step(
        'chargeCard',
        (ctx) => ({ balance: ctx.balance - 50 }),
        {
          compensate: () => {
            compensationLog.push('refundCard');
          }
        }
      )
      .step(
        'reserveInventory',
        () => ({}),
        {
          compensate: () => {
            compensationLog.push('releaseInventory');
          }
        }
      )
      .step('shipItem', () => {
        throw new Error('Shipping carrier unavailable');
      });

    const res = await pipeline.run({ balance: 100 });

    expect(res.success).toBe(false);
    expect(res.failedStep).toBe('shipItem');
    expect(res.error?.message).toBe('Shipping carrier unavailable');
    // Compensation should run in reverse order of completed steps: reserveInventory then chargeCard
    expect(compensationLog).toEqual(['releaseInventory', 'refundCard']);
  });

  it('should use fallback if step fails with fallback defined', async () => {
    const pipeline = createPipeline<{ data: string }>()
      .step(
        'failingStep',
        () => {
          throw new Error('Primary failed');
        },
        {
          fallback: () => ({ data: 'cached-fallback-data' })
        }
      );

    const res = await pipeline.run({ data: '' });
    expect(res.success).toBe(true);
    expect(res.context.data).toBe('cached-fallback-data');
  });
});
