/**
 * OptiKit Pipeline — Resilient multi-step asynchronous workflow orchestrator
 * with timeouts, retries, step compensation (Saga pattern), and lifecycle hooks.
 */

export interface StepOptions<TContext> {
  timeoutMs?: number;
  retries?: number;
  fallback?: (err: Error, ctx: TContext) => Partial<TContext> | void | Promise<Partial<TContext> | void>;
  compensate?: (ctx: TContext) => void | Promise<void>;
}

export interface StepRecord<TContext> {
  name: string;
  action: (ctx: TContext) => Partial<TContext> | void | Promise<Partial<TContext> | void>;
  options?: StepOptions<TContext>;
}

export interface PipelineResult<TContext> {
  success: boolean;
  context: TContext;
  durationMs: number;
  completedSteps: string[];
  failedStep?: string;
  error?: Error;
}

export class Pipeline<TContext extends Record<string, any>> {
  private steps: StepRecord<TContext>[] = [];
  private onStepStartHook?: (stepName: string, ctx: TContext) => void;
  private onStepEndHook?: (stepName: string, ctx: TContext, durationMs: number) => void;
  private onErrorHook?: (err: Error, stepName: string, ctx: TContext) => void;

  /**
   * Adds an execution step to the pipeline.
   *
   * @example
   * ```ts
   * pipeline.step('validateUser', async (ctx) => {
   *   return { isValid: true };
   * });
   * ```
   */
  public step(
    name: string,
    action: (ctx: TContext) => Partial<TContext> | void | Promise<Partial<TContext> | void>,
    options?: StepOptions<TContext>
  ): this {
    this.steps.push({ name, action, options });
    return this;
  }

  public onStepStart(fn: (stepName: string, ctx: TContext) => void): this {
    this.onStepStartHook = fn;
    return this;
  }

  public onStepEnd(fn: (stepName: string, ctx: TContext, durationMs: number) => void): this {
    this.onStepEndHook = fn;
    return this;
  }

  public onError(fn: (err: Error, stepName: string, ctx: TContext) => void): this {
    this.onErrorHook = fn;
    return this;
  }

  /**
   * Executes the pipeline steps sequentially.
   * If a step fails, compensation handlers of previous completed steps are run in reverse.
   */
  public async run(initialContext: TContext = {} as TContext): Promise<PipelineResult<TContext>> {
    const startTime = Date.now();
    const ctx: TContext = { ...initialContext };
    const completedSteps: string[] = [];
    const executedSteps: StepRecord<TContext>[] = [];

    for (const stepRecord of this.steps) {
      const { name, action, options } = stepRecord;
      const stepStart = Date.now();

      if (this.onStepStartHook) {
        this.onStepStartHook(name, ctx);
      }

      let stepSuccess = false;
      let lastError: Error | undefined;
      const retries = options?.retries || 0;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          let actionPromise = Promise.resolve(action(ctx));

          if (options?.timeoutMs && options.timeoutMs > 0) {
            actionPromise = Promise.race([
              actionPromise,
              new Promise<never>((_, reject) =>
                setTimeout(() => reject(new Error(`Step "${name}" timed out after ${options.timeoutMs}ms`)), options.timeoutMs)
              )
            ]);
          }

          const partialCtx = await actionPromise;
          if (partialCtx && typeof partialCtx === 'object') {
            Object.assign(ctx, partialCtx);
          }

          stepSuccess = true;
          break;
        } catch (err: any) {
          lastError = err instanceof Error ? err : new Error(String(err));
        }
      }

      if (!stepSuccess && options?.fallback) {
        try {
          const fallbackCtx = await Promise.resolve(options.fallback(lastError!, ctx));
          if (fallbackCtx && typeof fallbackCtx === 'object') {
            Object.assign(ctx, fallbackCtx);
          }
          stepSuccess = true;
        } catch (fbErr: any) {
          lastError = fbErr instanceof Error ? fbErr : new Error(String(fbErr));
        }
      }

      if (stepSuccess) {
        completedSteps.push(name);
        executedSteps.push(stepRecord);
        if (this.onStepEndHook) {
          this.onStepEndHook(name, ctx, Date.now() - stepStart);
        }
      } else {
        if (this.onErrorHook) {
          this.onErrorHook(lastError!, name, ctx);
        }

        // Compensation rollback (Saga pattern) in reverse order
        for (let i = executedSteps.length - 1; i >= 0; i--) {
          const prevStep = executedSteps[i];
          if (prevStep.options?.compensate) {
            try {
              await Promise.resolve(prevStep.options.compensate(ctx));
            } catch (compErr) {
              console.error(`Compensation error on step "${prevStep.name}":`, compErr);
            }
          }
        }

        return {
          success: false,
          context: ctx,
          durationMs: Date.now() - startTime,
          completedSteps,
          failedStep: name,
          error: lastError
        };
      }
    }

    return {
      success: true,
      context: ctx,
      durationMs: Date.now() - startTime,
      completedSteps
    };
  }
}

/**
 * Creates a new resilient workflow pipeline.
 *
 * @example
 * ```ts
 * const pipeline = createPipeline<{ count: number }>()
 *   .step('increment', (ctx) => ({ count: ctx.count + 1 }))
 *   .step('multiply', (ctx) => ({ count: ctx.count * 2 }));
 *
 * const res = await pipeline.run({ count: 5 });
 * // res.context.count === 12
 * ```
 */
export function createPipeline<TContext extends Record<string, any>>(): Pipeline<TContext> {
  return new Pipeline<TContext>();
}
