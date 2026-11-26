import { describe, it, expect } from 'vitest';
import {
  createCounter, createGauge, createHistogram, percentileFromBuckets, createSummary,
  createMetricsRegistry, exportPrometheusText, formatTraceId, createSpan, startTrace,
  injectTraceContext, extractTraceContext, createHealthCheck, runHealthChecks,
  createProfiler, measureSync, measureAsync, createRingLogBuffer, createAuditTrail,
  redactFields, trackEventRate, movingWindowCounter, createAlertEvaluator,
} from '../telemetry';

describe('Telemetry & Diagnostics', () => {
  it('supports Counter, Gauge, Histogram, Summary, and Prometheus export', () => {
    const reg = createMetricsRegistry();
    const c = reg.counter('req_total');
    c.inc(3);
    expect(c.get()).toBe(3);

    const g = reg.gauge('active_conns');
    g.set(10);
    g.dec(2);
    expect(g.get()).toBe(8);

    const h = reg.histogram('latency_ms', [10, 50, 100]);
    h.observe(5);
    h.observe(40);
    h.observe(200);
    const buckets = h.getBuckets();
    expect(buckets['le_50']).toBe(2);
    expect(percentileFromBuckets(buckets, 0.5)).toBe(50);

    const s = createSummary('resp_size');
    [10, 20, 30, 40, 50].forEach((v) => s.observe(v));
    expect(s.quantile(0.5)).toBe(30);

    const prom = exportPrometheusText(reg);
    expect(prom).toContain('req_total 3');
    expect(prom).toContain('latency_ms_count 3');
  });

  it('supports distributed tracing, health checks, profiling, logs, and alerts', async () => {
    const trace = startTrace('http_request');
    const child = trace.child('db_query', { table: 'users' });
    const headers = injectTraceContext(child);
    const extracted = extractTraceContext(headers);
    expect(extracted?.traceId).toBe(trace.root.traceId);
    expect(formatTraceId(8).length).toBe(16);
    child.end();
    expect(child.durationMs()).toBeGreaterThanOrEqual(0);

    const hc = await runHealthChecks([
      createHealthCheck('db', () => ({ ok: true })),
      createHealthCheck('cache', async () => ({ ok: false, detail: 'down' })),
    ]);
    expect(hc.healthy).toBe(false);
    expect(hc.results.db.ok).toBe(true);

    const prof = createProfiler();
    prof.mark('start');
    prof.mark('end');
    expect(prof.measure('start', 'end')).toBeGreaterThanOrEqual(0);
    expect(measureSync(() => 42).result).toBe(42);
    expect((await measureAsync(async () => 99)).result).toBe(99);

    const ring = createRingLogBuffer<string>(2);
    ring.push('a');
    ring.push('b');
    ring.push('c');
    expect(ring.getAll()).toEqual(['b', 'c']);

    const audit = createAuditTrail();
    audit.record('admin', 'DELETE', 'user:1');
    expect(audit.queryByActor('admin').length).toBe(1);
    expect(redactFields({ user: 'a', password: '123' })).toEqual({ user: 'a', password: '[REDACTED]' });

    const rate = trackEventRate(1000);
    rate.record(100);
    expect(rate.ratePerSecond(200)).toBeGreaterThan(0);

    const mwc = movingWindowCounter(1000);
    mwc.increment(100);
    expect(mwc.count(200)).toBe(1);

    const evaluate = createAlertEvaluator([{ name: 'cpu', threshold: 80, op: '>' }]);
    expect(evaluate({ cpu: 90 })).toEqual(['cpu']);
  });
});
