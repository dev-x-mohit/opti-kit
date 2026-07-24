/**
 * Finite State Machine Utilities
 */

export interface MachineConfig {
  initial: string;
  states: Record<string, {
    on?: Record<string, string>;
  }>;
}

export class StateMachine {
  private state: string;
  private history: string[] = [];

  constructor(private config: MachineConfig) {
    this.state = config.initial;
    this.history.push(this.state);
  }

  transition(event: string): boolean {
    const currentStateConfig = this.config.states[this.state];
    if (currentStateConfig && currentStateConfig.on && currentStateConfig.on[event]) {
      this.state = currentStateConfig.on[event];
      this.history.push(this.state);
      return true;
    }
    return false;
  }

  canTransition(event: string): boolean {
    const currentStateConfig = this.config.states[this.state];
    return !!(currentStateConfig && currentStateConfig.on && currentStateConfig.on[event]);
  }

  getState(): string {
    return this.state;
  }

  getHistory(): string[] {
    return [...this.history];
  }
}

export function createMachine(config: MachineConfig): StateMachine {
  return new StateMachine(config);
}

export function transitionState(machine: StateMachine, event: string): boolean {
  return machine.transition(event);
}

export function canTransition(machine: StateMachine, event: string): boolean {
  return machine.canTransition(event);
}

export function getMachineState(machine: StateMachine): string {
  return machine.getState();
}

export function getMachineHistory(machine: StateMachine): string[] {
  return machine.getHistory();
}
