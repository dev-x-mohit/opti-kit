type Listener = (...args: any[]) => void;

/**
 * A lightweight, high-performance event emitter class for managing pub-sub events.
 */
export class EventEmitter {
  private events: Record<string, Listener[]> = {};

  /**
   * Registers a listener function for a specific event name.
   */
  on(event: string, listener: Listener): this {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  /**
   * Registers a listener that executes only once and automatically unregisters.
   */
  once(event: string, listener: Listener): this {
    const onceWrapper = (...args: any[]) => {
      this.off(event, onceWrapper);
      listener.apply(this, args);
    };
    return this.on(event, onceWrapper);
  }

  /**
   * Unregisters a specific listener function, or clears all listeners for the event if none is specified.
   */
  off(event: string, listener?: Listener): this {
    if (!this.events[event]) return this;
    if (!listener) {
      delete this.events[event];
      return this;
    }
    this.events[event] = this.events[event].filter((l) => l !== listener);
    return this;
  }

  /**
   * Emits an event, triggering all registered listeners with the provided arguments.
   * Returns true if the event has listeners, false otherwise.
   */
  emit(event: string, ...args: any[]): boolean {
    if (!this.events[event] || this.events[event].length === 0) {
      return false;
    }
    const listeners = [...this.events[event]];
    for (const listener of listeners) {
      listener(...args);
    }
    return true;
  }

  /**
   * Removes all registered events and their listeners.
   */
  clear(): this {
    this.events = {};
    return this;
  }
}

/**
 * Attaches an event listener to a target and returns a function to remove it.
 */
export function listen(
  target: EventTarget,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): () => void {
  target.addEventListener(event, handler, options);
  return () => {
    target.removeEventListener(event, handler, options);
  };
}

/**
 * Attaches a one-time event listener to a target. Returns a function to remove it early.
 */
export function listenOnce(
  target: EventTarget,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  const wrapped = (e: Event) => {
    target.removeEventListener(event, wrapped, options);
    handler(e);
  };
  target.addEventListener(event, wrapped, options);
  return () => {
    target.removeEventListener(event, wrapped, options);
  };
}

/**
 * Triggers a custom event on a target with optional detail payload.
 */
export function triggerEvent(
  target: EventTarget,
  eventName: string,
  detail?: any
): boolean {
  if (typeof window === "undefined" || typeof CustomEvent === "undefined") return false;
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail,
  });
  return target.dispatchEvent(event);
}

/**
 * Attaches an event listener that delegates to a specific child selector.
 * Returns a function to remove the listener.
 */
export function delegateEvent(
  target: HTMLElement | Document,
  event: string,
  selector: string,
  handler: (e: Event, matchedTarget: HTMLElement) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  const wrapper = (e: Event) => {
    let current = e.target as HTMLElement | null;
    while (current && current !== target) {
      if (current.matches && current.matches(selector)) {
        handler(e, current);
        return;
      }
      current = current.parentElement;
    }
  };
  target.addEventListener(event, wrapper as EventListener, options);
  return () => {
    target.removeEventListener(event, wrapper as EventListener, options);
  };
}

/**
 * Returns a promise that resolves when the specified event is fired on the target.
 * Optionally rejects if a timeout is reached.
 */
export function waitForEvent(
  target: EventTarget,
  event: string,
  timeoutMs?: number
): Promise<Event> {
  return new Promise((resolve, reject) => {
    const wrapped = (e: Event) => {
      if (timer) clearTimeout(timer);
      target.removeEventListener(event, wrapped);
      resolve(e);
    };
    target.addEventListener(event, wrapped);
    
    let timer: any;
    if (timeoutMs) {
      timer = setTimeout(() => {
        target.removeEventListener(event, wrapped);
        reject(new Error(`waitForEvent: Timeout of ${timeoutMs}ms exceeded`));
      }, timeoutMs);
    }
  });
}

/**
 * Prevents the default action and stops event propagation.
 */
export function stopEvent(e: Event): void {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
}
