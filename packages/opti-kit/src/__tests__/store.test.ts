import { describe, it, expect, vi } from "vitest";
import { signal, computed, effect, createStore } from "../store";

describe("store module - signals", () => {
  it("creates and updates signals", () => {
    const count = signal(0);
    expect(count.value).toBe(0);

    count.value = 5;
    expect(count.value).toBe(5);
  });

  it("supports subscription", () => {
    const count = signal(10);
    const spy = vi.fn();
    const unsubscribe = count.subscribe(spy);

    expect(spy).toHaveBeenCalledWith(10);

    count.value = 20;
    expect(spy).toHaveBeenCalledWith(20);
    expect(spy).toHaveBeenCalledTimes(2);

    unsubscribe();
    count.value = 30;
    expect(spy).toHaveBeenCalledTimes(2); // No new calls
  });

  it("handles computed values", () => {
    const count = signal(2);
    const double = computed(() => count.value * 2);

    expect(double.value).toBe(4);

    count.value = 5;
    expect(double.value).toBe(10);
  });

  it("triggers effects automatically", () => {
    const name = signal("Mohit");
    const greeting = signal("Hello");
    const spy = vi.fn();

    effect(() => {
      spy(`${greeting.value}, ${name.value}!`);
    });

    expect(spy).toHaveBeenLastCalledWith("Hello, Mohit!");

    name.value = "John";
    expect(spy).toHaveBeenLastCalledWith("Hello, John!");

    greeting.value = "Hi";
    expect(spy).toHaveBeenLastCalledWith("Hi, John!");
    expect(spy).toHaveBeenCalledTimes(3);
  });
});

describe("store module - state store", () => {
  it("creates stores and maintains state", () => {
    const store = createStore({ count: 0, name: "Mohit" });
    expect(store.getState()).toEqual({ count: 0, name: "Mohit" });

    store.setState({ count: 1 });
    expect(store.getState()).toEqual({ count: 1, name: "Mohit" });

    store.setState((prev) => ({ count: prev.count + 5 }));
    expect(store.getState()).toEqual({ count: 6, name: "Mohit" });
  });

  it("supports store subscription", () => {
    const store = createStore({ count: 0 });
    const spy = vi.fn();
    const unsubscribe = store.subscribe(spy);

    store.setState({ count: 1 });
    expect(spy).toHaveBeenCalledWith({ count: 1 }, { count: 0 });

    unsubscribe();
    store.setState({ count: 2 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
