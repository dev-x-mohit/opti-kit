import { describe, it, expect } from 'vitest';
import { createMachine } from '../fsm';

describe('FSM utilities', () => {
  it('should transition', () => {
    const m = createMachine({
      initial: 'idle',
      states: { idle: { on: { GO: 'active' } }, active: {} }
    });
    expect(m.getState()).toBe('idle');
    m.transition('GO');
    expect(m.getState()).toBe('active');
  });
});
