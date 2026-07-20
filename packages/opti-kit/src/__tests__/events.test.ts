import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "../events";

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
