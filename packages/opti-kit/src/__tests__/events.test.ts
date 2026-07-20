import { describe, it, expect, vi } from "vitest";
import {
  EventEmitter,
  listen,
  listenOnce,
  triggerEvent,
  delegateEvent,
  waitForEvent,
  stopEvent,
} from "../events";

describe("EventEmitter", () => {
  it("registers and triggers events", () => {
    const emitter = new EventEmitter();
    let val = 0;
    
    emitter.on("add", (num: number) => {
      val += num;
    });

    emitter.emit("add", 5);
    emitter.emit("add", 10);

    expect(val).toBe(15);
  });

  it("handles once listeners correctly", () => {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.once("click", () => {
      count++;
    });

    emitter.emit("click");
    emitter.emit("click"); // should not execute again

    expect(count).toBe(1);
  });

  it("unregisters specific listeners", () => {
    const emitter = new EventEmitter();
    let count = 0;
    
    const cb = () => {
      count++;
    };

    emitter.on("update", cb);
    emitter.emit("update");
    
    emitter.off("update", cb);
    emitter.emit("update"); // should not execute

    expect(count).toBe(1);
  });

  it("clears all listeners", () => {
    const emitter = new EventEmitter();
    const mock = vi.fn();

    emitter.on("x", mock);
    emitter.on("y", mock);
    
    emitter.clear();
    
    emitter.emit("x");
    emitter.emit("y");

    expect(mock).not.toHaveBeenCalled();
  });
});

describe("DOM Event utilities", () => {
  it("listen and unbind", () => {
    const target = new EventTarget();
    const handler = vi.fn();
    const unbind = listen(target, "click", handler);
    
    target.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);

    unbind();
    target.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("listenOnce", () => {
    const target = new EventTarget();
    const handler = vi.fn();
    listenOnce(target, "click", handler as any);
    
    target.dispatchEvent(new Event("click"));
    target.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("waitForEvent resolves", async () => {
    const target = new EventTarget();
    setTimeout(() => target.dispatchEvent(new Event("ready")), 10);
    const event = await waitForEvent(target, "ready", 100);
    expect(event.type).toBe("ready");
  });

  it("waitForEvent rejects on timeout", async () => {
    const target = new EventTarget();
    await expect(waitForEvent(target, "ready", 10)).rejects.toThrow("waitForEvent: Timeout of 10ms exceeded");
  });

  it("stopEvent prevents default and propagation", () => {
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as any;
    stopEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it("triggerEvent handles execution safely", () => {
    const target = new EventTarget();
    const result = triggerEvent(target, "custom");
    expect(typeof result).toBe("boolean");
  });
});
