import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchWithTimeout,
  fetchWithRetry,
  fetchJson,
  isNetworkError,
  parseHeaders
} from "../http";

describe("http module", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetchWithTimeout success", async () => {
    const mockResponse = new Response("ok", { status: 200 });
    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    const res = await fetchWithTimeout("https://api.example.com", 5000);
    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.example.com",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it("fetchWithTimeout failure on abort", async () => {
    vi.mocked(global.fetch).mockImplementationOnce((_, init) => {
      return new Promise((_, reject) => {
        if (init?.signal) {
          init.signal.addEventListener("abort", () => {
            reject(new DOMException("The user aborted a request.", "AbortError"));
          });
        }
      });
    });

    const promise = fetchWithTimeout("https://api.example.com", 10);
    await expect(promise).rejects.toThrow("aborted");
  });

  it("fetchWithRetry success on first try", async () => {
    const mockResponse = new Response("ok", { status: 200 });
    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    const res = await fetchWithRetry("https://api.example.com", { retries: 2, delay: 1 });
    expect(res.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("fetchWithRetry recovers after failure", async () => {
    const failResponse = new Response("error", { status: 500, statusText: "Internal Server Error" });
    const successResponse = new Response("ok", { status: 200 });

    vi.mocked(global.fetch)
      .mockResolvedValueOnce(failResponse)
      .mockResolvedValueOnce(successResponse);

    const res = await fetchWithRetry("https://api.example.com", { retries: 2, delay: 1 });
    expect(res.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("fetchJson parses valid JSON response", async () => {
    const data = { hello: "world" };
    const mockResponse = new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
    vi.mocked(global.fetch).mockResolvedValueOnce(mockResponse);

    const res = await fetchJson("https://api.example.com/json");
    expect(res).toEqual(data);
  });

  it("fetchJson throws on HTTP error response", async () => {
    const failResponse = new Response("Not Found", { status: 404, statusText: "Not Found" });
    vi.mocked(global.fetch).mockResolvedValueOnce(failResponse);

    await expect(fetchJson("https://api.example.com/404")).rejects.toThrow("HTTP Error 404");
  });

  it("isNetworkError identification", () => {
    expect(isNetworkError(new TypeError("Failed to fetch"))).toBe(true);
    expect(isNetworkError(new DOMException("Aborted", "AbortError"))).toBe(true);
    expect(isNetworkError(new Error("Normal logical error"))).toBe(false);
    expect(isNetworkError(null)).toBe(false);
  });

  it("parseHeaders correctly maps headers format", () => {
    const headerObj = { "Content-Type": "application/json", "Authorization": "Bearer token" };
    expect(parseHeaders(headerObj)).toEqual(headerObj);

    const headerArr: [string, string][] = [
      ["x-custom", "value"],
      ["x-another", "1"]
    ];
    expect(parseHeaders(headerArr)).toEqual({
      "x-custom": "value",
      "x-another": "1"
    });

    if (typeof Headers !== "undefined") {
      const headersInst = new Headers();
      headersInst.append("x-test", "yes");
      expect(parseHeaders(headersInst)).toEqual({ "x-test": "yes" });
    }
  });
});
