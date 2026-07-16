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
