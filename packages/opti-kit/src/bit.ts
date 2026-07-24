/**
 * Sets the bit at the given position.
 */
export function setBit(number: number, position: number): number {
  return number | (1 << position);
}

/**
 * Clears the bit at the given position.
 */
export function clearBit(number: number, position: number): number {
  return number & ~(1 << position);
}

/**
 * Toggles the bit at the given position.
 */
export function toggleBit(number: number, position: number): number {
  return number ^ (1 << position);
}

/**
 * Checks if the bit at the given position is set (1).
 */
export function checkBit(number: number, position: number): boolean {
  return (number & (1 << position)) !== 0;
}

/**
 * Updates the bit at the given position with the specified value (0 or 1).
 */
export function updateBit(number: number, position: number, value: 0 | 1): number {
  const clearMask = ~(1 << position);
  return (number & clearMask) | (value << position);
}

/**
 * Counts the number of set bits (1s) in a number (Brian Kernighan’s Algorithm).
 */
export function countSetBits(number: number): number {
  let count = 0;
  while (number > 0) {
    number &= (number - 1);
    count++;
  }
  return count;
}

/**
 * Checks if a number is a power of 2.
 */
export function isPowerOfTwo(number: number): boolean {
  return number > 0 && (number & (number - 1)) === 0;
}

/**
 * Isolates the rightmost 1-bit.
 */
export function isolateRightmostBit(number: number): number {
  return number & -number;
}

/**
 * Gets the rightmost 0-bit.
 */
export function isolateRightmostZeroBit(number: number): number {
  return ~number & (number + 1);
}

/**
 * Clears the rightmost 1-bit.
 */
export function clearRightmostBit(number: number): number {
  return number & (number - 1);
}

/**
 * Flips all bits.
 */
export function flipBits(number: number): number {
  return ~number;
}
