import { describe, it, expect } from 'vitest';
import { getTrickWinner } from '../winner';
import type { Card } from '../../types';

describe('getTrickWinner', () => {
  it('should throw error for empty trick', () => {
    expect(() => getTrickWinner({})).toThrow('Cannot determine winner of empty trick');
  });

  it('should determine winner when all cards are same suit', () => {
    const plays = {
      '0': { suit: 'blue', value: 3 } as Card,
      '1': { suit: 'blue', value: 7 } as Card,
      '2': { suit: 'blue', value: 5 } as Card,
    };

    expect(getTrickWinner(plays)).toBe('1'); // Highest blue (7)
  });

  it('should determine winner with mixed suits without submarines', () => {
    const plays = {
      '0': { suit: 'blue', value: 3 } as Card, // Led suit
      '1': { suit: 'pink', value: 9 } as Card, // Off-suit, can't win
      '2': { suit: 'blue', value: 5 } as Card, // Led suit
    };

    expect(getTrickWinner(plays)).toBe('2'); // Highest of led suit (blue 5)
  });

  it('should handle submarine (trump) beating all other cards', () => {
    const plays = {
      '0': { suit: 'blue', value: 9 } as Card, // Led suit, highest non-trump
      '1': { suit: 'sub', value: 1 } as Card, // Lowest submarine
      '2': { suit: 'pink', value: 8 } as Card, // Off-suit
    };

    expect(getTrickWinner(plays)).toBe('1'); // Submarine wins
  });

  it('should determine winner among multiple submarines', () => {
    const plays = {
      '0': { suit: 'blue', value: 3 } as Card, // Led suit
      '1': { suit: 'sub', value: 2 } as Card, // Lower submarine
      '2': { suit: 'sub', value: 4 } as Card, // Higher submarine
      '3': { suit: 'sub', value: 1 } as Card, // Lowest submarine
    };

    expect(getTrickWinner(plays)).toBe('2'); // Highest submarine (4)
  });

  it('should handle submarine leading the trick', () => {
    const plays = {
      '0': { suit: 'sub', value: 2 } as Card, // Led submarine
      '1': { suit: 'sub', value: 4 } as Card, // Higher submarine
      '2': { suit: 'blue', value: 9 } as Card, // High off-suit (can't win)
    };

    expect(getTrickWinner(plays)).toBe('1'); // Highest submarine (4)
  });

  it('should handle single card trick', () => {
    const plays = {
      '0': { suit: 'green', value: 6 } as Card,
    };

    expect(getTrickWinner(plays)).toBe('0'); // Only player wins
  });

  it('should handle edge case with only off-suit cards', () => {
    // This shouldn't happen in valid play, but test the fallback
    const plays = {
      '0': { suit: 'blue', value: 3 } as Card, // "Led" suit
      '1': { suit: 'pink', value: 9 } as Card, // Off-suit
      '2': { suit: 'green', value: 8 } as Card, // Off-suit
    };

    expect(getTrickWinner(plays)).toBe('0'); // Highest of led suit (only blue)
  });

  it('should handle ties by returning first occurrence', () => {
    const plays = {
      '0': { suit: 'blue', value: 5 } as Card,
      '1': { suit: 'blue', value: 5 } as Card, // Same value as first
    };

    expect(getTrickWinner(plays)).toBe('0'); // First player with highest value
  });
});
