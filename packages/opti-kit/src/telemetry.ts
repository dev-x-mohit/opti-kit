/**
 * OptiKit Telemetry — Metrics (Counter, Gauge, Histogram, Summary, Prometheus export),
 * W3C-style Distributed Tracing, Health Checks, Ring Log Buffer, and Audit Trails.
 */

export interface CounterMetric {
  readonly name: string;
  inc(amount?: number): void;
  get(): number;
  reset(): void;
}

/** Creates a monotonically increasing Counter metric. */
export function createCounter(name: string, initial = 0): CounterMetric {
  let value = initial;
  return {
    name,
    inc(amount = 1) {
      if (amount < 0) throw new Error('Counter cannot decrease');
      value += amount;
    },
    get: () => value,
    reset() {
      value = 0;
    },
  };
}

export interface GaugeMetric {
  readonly name: string;
  set(value: number): void;
  inc(amount?: number): void;
  dec(amount?: number): void;
  get(): number;
}

/** Creates a Gauge metric that can go up or down. */
export function createGauge(name: string, initial = 0): GaugeMetric {
  let value = initial;
  return {
    name,
    set: (v) => { value = v; },
    inc: (amount = 1) => { value += amount; },
    dec: (amount = 1) => { value -= amount; },
    get: () => value,
  };
}

export interface HistogramMetric {
  readonly name: string;
  observe(value: number): void;
  getBuckets(): Record<string, number>;
  getStats(): { count: number; sum: number; min: number; max: number; mean: number };
  reset(): void;
}

/** Creates a bucketed Histogram metric. */
export function createHistogram(
  name: string,
  buckets: readonly number[] = [5, 10, 25, 50, 100, 250, 500, 1000]
): HistogramMetric {
  const sortedBuckets = [...buckets].sort((a, b) => a - b);
  const counts = new Array<number>(sortedBuckets.length + 1).fill(0);
  let sum = 0;
  let count = 0;
  let min = Infinity;
  let max = -Infinity;

  return {
    name,
    observe(value: number) {
      count++;
      sum += value;
      if (value < min) min = value;
      if (value > max) max = value;
      let placed = false;
      for (let i = 0; i < sortedBuckets.length; i++) {
        if (value <= sortedBuckets[i]) {
          counts[i]++;
          placed = true;
          break;
        }
      }
      if (!placed) counts[sortedBuckets.length]++;
    },
    getBuckets() {
      const out: Record<string, number> = {};
      let cumulative = 0;
      for (let i = 0; i < sortedBuckets.length; i++) {
        cumulative += counts[i];
        out[`le_${sortedBuckets[i]}`] = cumulative;
      }
      cumulative += counts[sortedBuckets.length];
      out['le_+Inf'] = cumulative;
      return out;
    },
    getStats() {
      return {
        count,
        sum,
        min: count === 0 ? 0 : min,
        max: count === 0 ? 0 : max,
        mean: count === 0 ? 0 : sum / count,
      };
    },
    reset() {
      counts.fill(0);
      sum = 0;
      count = 0;
      min = Infinity;
      max = -Infinity;
    },
  };
}

/** Estimates a quantile `p` (`0..1`) from a cumulative histogram bucket map. */
export function percentileFromBuckets(
  buckets: Record<string, number>,
  p: number
): number {
  const entries = Object.entries(buckets)
    .filter(([k]) => k !== 'le_+Inf')
    .map(([k, v]) => [Number(k.replace('le_', '')), v] as [number, number])
    .sort((a, b) => a[0] - b[0]);
  const total = buckets['le_+Inf'] ?? entries[entries.length - 1]?.[1] ?? 0;
  if (total === 0 || entries.length === 0) return 0;
  const target = p * total;
  for (const [bound, cum] of entries) {
    if (cum >= target) return bound;
  }
  return entries[entries.length - 1][0];
}

/** Creates a streaming Summary metric computing exact quantiles over a sliding window. */
export function createSummary(name: string, maxSamples = 1000) {
  const samples: number[] = [];
  return {
    name,
    observe(value: number) {
      samples.push(value);
      if (samples.length > maxSamples) samples.shift();
    },
    quantile(q: number): number {
      if (samples.length === 0) return 0;
      const sorted = [...samples].sort((a, b) => a - b);
      const pos = Math.min(sorted.length - 1, Math.max(0, Math.floor(q * (sorted.length - 1))));
      return sorted[pos];
    },
    get count() {
      return samples.length;
    },
  };
}

export interface MetricsRegistry {
  counter(name: string): CounterMetric;
  gauge(name: string): GaugeMetric;
  histogram(name: string, buckets?: readonly number[]): HistogramMetric;
  list(): { counters: CounterMetric[]; gauges: GaugeMetric[]; histograms: HistogramMetric[] };
}

/** Creates a central Metrics Registry. */
export function createMetricsRegistry(): MetricsRegistry {
  const counters = new Map<string, CounterMetric>();
  const gauges = new Map<string, GaugeMetric>();
  const histograms = new Map<string, HistogramMetric>();
  return {
    counter(name) {
      if (!counters.has(name)) counters.set(name, createCounter(name));
      return counters.get(name)!;
    },
    gauge(name) {
      if (!gauges.has(name)) gauges.set(name, createGauge(name));
      return gauges.get(name)!;
    },
    histogram(name, buckets) {
      if (!histograms.has(name)) histograms.set(name, createHistogram(name, buckets));
      return histograms.get(name)!;
    },
    list: () => ({
      counters: Array.from(counters.values()),
      gauges: Array.from(gauges.values()),
      histograms: Array.from(histograms.values()),
    }),
  };
}

/** Formats all metrics in a registry to Prometheus exposition text format. */
export function exportPrometheusText(registry: MetricsRegistry): string {
  const { counters, gauges, histograms } = registry.list();
  const lines: string[] = [];
  for (const c of counters) {
    lines.push(`# TYPE ${c.name} counter`, `${c.name} ${c.get()}`);
  }
  for (const g of gauges) {
    lines.push(`# TYPE ${g.name} gauge`, `${g.name} ${g.get()}`);
  }
  for (const h of histograms) {
    lines.push(`# TYPE ${h.name} histogram`);
    const stats = h.getStats();
    for (const [k, v] of Object.entries(h.getBuckets())) {
      const le = k.replace('le_', '');
      lines.push(`${h.name}_bucket{le="${le}"} ${v}`);
    }
    lines.push(`${h.name}_sum ${stats.sum}`, `${h.name}_count ${stats.count}`);
  }
  return lines.join('\n');
}

export interface TraceSpan {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  startTime: number;
  endTime?: number;
  attributes: Record<string, unknown>;
  end(): TraceSpan;
  durationMs(): number;
}

/** Formats a random hex ID of `bytes` length (16 bytes = 32 hex chars for W3C traceId). */
export function formatTraceId(bytes = 16): string {
  let out = '';
  for (let i = 0; i < bytes; i++) {
    out += Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  }
  return out;
}

/** Creates a distributed tracing Span. */
export function createSpan(
  name: string,
  traceId = formatTraceId(16),
  parentSpanId?: string,
  attributes: Record<string, unknown> = {}
): TraceSpan {
  const span: TraceSpan = {
    traceId,
    spanId: formatTraceId(8),
    parentSpanId,
    name,
    startTime: Date.now(),
    attributes: { ...attributes },
    end() {
      if (this.endTime === undefined) this.endTime = Date.now();
      return this;
    },
    durationMs() {
      return (this.endTime ?? Date.now()) - this.startTime;
    },
  };
  return span;
}

/** Starts a new root trace and returns the root span + child-span factory. */
export function startTrace(rootName: string) {
  const root = createSpan(rootName);
  return {
    root,
    child(name: string, attributes?: Record<string, unknown>) {
      return createSpan(name, root.traceId, root.spanId, attributes);
    },
  };
}

/** Injects a span into a W3C `traceparent` header map. */
export function injectTraceContext(
  span: TraceSpan,
  headers: Record<string, string> = {}
): Record<string, string> {
  return {
    ...headers,
    traceparent: `00-${span.traceId}-${span.spanId}-01`,
  };
}

/** Extracts `traceId` and `spanId` from a W3C `traceparent` header. */
export function extractTraceContext(
  headers: Record<string, string | undefined>
): { traceId: string; parentSpanId: string; flags: string } | null {
  const tp = headers.traceparent ?? headers.Traceparent;
  if (!tp) return null;
  const parts = tp.split('-');
  if (parts.length !== 4) return null;
  return { traceId: parts[1], parentSpanId: parts[2], flags: parts[3] };
}

export type HealthCheckFn = () => Promise<{ ok: boolean; detail?: string }> | { ok: boolean; detail?: string };

/** Creates a named health check descriptor. */
export function createHealthCheck(name: string, check: HealthCheckFn) {
  return { name, check };
}

/** Runs multiple health checks concurrently and returns an aggregate status report. */
export async function runHealthChecks(
  checks: readonly { name: string; check: HealthCheckFn }[]
): Promise<{
  healthy: boolean;
  results: Record<string, { ok: boolean; detail?: string; durationMs: number }>;
}> {
  const results: Record<string, { ok: boolean; detail?: string; durationMs: number }> = {};
  let healthy = true;
  await Promise.all(
    checks.map(async ({ name, check }) => {
      const start = Date.now();
      try {
        const res = await check();
        if (!res.ok) healthy = false;
        results[name] = { ...res, durationMs: Date.now() - start };
      } catch (err) {
        healthy = false;
        results[name] = {
          ok: false,
          detail: err instanceof Error ? err.message : String(err),
          durationMs: Date.now() - start,
        };
      }
    })
  );
  return { healthy, results };
}

/** Creates a multi-mark performance profiler. */
export function createProfiler() {
  const marks = new Map<string, number>();
  return {
    mark(label: string) {
      marks.set(label, typeof performance !== 'undefined' ? performance.now() : Date.now());
    },
    measure(fromLabel: string, toLabel?: string): number {
      const start = marks.get(fromLabel);
      if (start === undefined) throw new Error(`Unknown mark "${fromLabel}"`);
      const end = toLabel
        ? marks.get(toLabel) ?? (() => { throw new Error(`Unknown mark "${toLabel}"`); })()
        : (typeof performance !== 'undefined' ? performance.now() : Date.now());
      return end - start;
    },
  };
}

/** Measures synchronous execution duration and returns `{ result, durationMs }`. */
export function measureSync<T>(fn: () => T): { result: T; durationMs: number } {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const result = fn();
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return { result, durationMs: end - start };
}

/** Measures asynchronous execution duration and returns `{ result, durationMs }`. */
export async function measureAsync<T>(fn: () => Promise<T>): Promise<{ result: T; durationMs: number }> {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const result = await fn();
  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return { result, durationMs: end - start };
}

/** Creates a fixed-capacity ring buffer for in-memory structured logs. */
export function createRingLogBuffer<T = Record<string, unknown>>(capacity = 100) {
  const buffer: T[] = [];
  const cap = Math.max(1, capacity);
  return {
    push(entry: T) {
      buffer.push(entry);
      if (buffer.length > cap) buffer.shift();
    },
    getAll: () => [...buffer],
    clear() {
      buffer.length = 0;
    },
    get size() {
      return buffer.length;
    },
  };
}

/** Creates an append-only Audit Trail recording actor, action, resource, and timestamp. */
export function createAuditTrail<TMeta = Record<string, unknown>>() {
  const events: { actor: string; action: string; resource: string; timestamp: number; meta?: TMeta }[] = [];
  return {
    record(actor: string, action: string, resource: string, meta?: TMeta) {
      const ev = { actor, action, resource, timestamp: Date.now(), meta };
      events.push(ev);
      return ev;
    },
    queryByActor: (actor: string) => events.filter((e) => e.actor === actor),
    queryByResource: (resource: string) => events.filter((e) => e.resource === resource),
    getAll: () => [...events],
  };
}

/** Recursively redacts sensitive keys (e.g. `password`, `token`, `secret`) from an object. */
export function redactFields<T>(
  input: T,
  sensitiveKeys: readonly string[] = ['password', 'token', 'secret', 'apiKey', 'authorization'],
  mask = '[REDACTED]'
): T {
  const lowerSet = new Set(sensitiveKeys.map((k) => k.toLowerCase()));
  const walk = (val: unknown): unknown => {
    if (Array.isArray(val)) return val.map(walk);
    if (val && typeof val === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(val)) {
        out[k] = lowerSet.has(k.toLowerCase()) ? mask : walk(v);
      }
      return out;
    }
    return val;
  };
  return walk(input) as T;
}

/** Tracks event timestamps to compute events-per-second over a sliding window. */
export function trackEventRate(windowMs = 1000) {
  const timestamps: number[] = [];
  const prune = (now: number) => {
    while (timestamps.length > 0 && now - timestamps[0] > windowMs) {
      timestamps.shift();
    }
  };
  return {
    record(now = Date.now()) {
      timestamps.push(now);
      prune(now);
    },
    ratePerSecond(now = Date.now()): number {
      prune(now);
      return (timestamps.length / windowMs) * 1000;
    },
  };
}

/** Creates a sliding-window counter returning event count in the last `windowMs`. */
export function movingWindowCounter(windowMs = 60_000) {
  const stamps: number[] = [];
  return {
    increment(now = Date.now()) {
      stamps.push(now);
      while (stamps.length > 0 && now - stamps[0] > windowMs) stamps.shift();
    },
    count(now = Date.now()): number {
      while (stamps.length > 0 && now - stamps[0] > windowMs) stamps.shift();
      return stamps.length;
    },
  };
}

/** Evaluates threshold alert rules against metric values. */
export function createAlertEvaluator(rules: readonly { name: string; threshold: number; op: '>' | '>=' | '<' | '<=' }[]) {
  return (metrics: Record<string, number>): string[] => {
    const triggered: string[] = [];
    for (const rule of rules) {
      const val = metrics[rule.name];
      if (val === undefined) continue;
      const hit =
        (rule.op === '>' && val > rule.threshold) ||
        (rule.op === '>=' && val >= rule.threshold) ||
        (rule.op === '<' && val < rule.threshold) ||
        (rule.op === '<=' && val <= rule.threshold);
      if (hit) triggered.push(rule.name);
    }
    return triggered;
  };
}
