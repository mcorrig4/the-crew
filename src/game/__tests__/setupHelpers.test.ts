import { describe, it, expect } from 'vitest';
import type { Card } from '../../types/Card';
import { detectCaptain } from '../setupHelpers';

describe('detectCaptain', () => {
  it('should return index of player holding submarine 4', () => {
    const hands: Card[][] = [
      [
        { suit: 'pink', value: 1 },
        { suit: 'blue', value: 2 },
      ],
      [
        { suit: 'sub', value: 4 }, // Captain card
        { suit: 'green', value: 3 },
      ],
      [
        { suit: 'yellow', value: 5 },
        { suit: 'sub', value: 1 },
      ],
    ];

    const captain = detectCaptain(hands);
    expect(captain).toBe(1);
  });

  it('should return 0 when first player is captain', () => {
    const hands: Card[][] = [
      [
        { suit: 'sub', value: 4 }, // Captain card
        { suit: 'blue', value: 2 },
      ],
      [
        { suit: 'pink', value: 1 },
        { suit: 'green', value: 3 },
      ],
    ];

    const captain = detectCaptain(hands);
    expect(captain).toBe(0);
  });

  it('should return last index when last player is captain', () => {
    const hands: Card[][] = [
      [
        { suit: 'pink', value: 1 },
        { suit: 'blue', value: 2 },
      ],
      [
        { suit: 'green', value: 3 },
        { suit: 'yellow', value: 5 },
      ],
      [
        { suit: 'sub', value: 1 },
        { suit: 'sub', value: 4 }, // Captain card
      ],
    ];

    const captain = detectCaptain(hands);
    expect(captain).toBe(2);
  });

  it('should throw error when captain card is not found', () => {
    const hands: Card[][] = [
      [
        { suit: 'pink', value: 1 },
        { suit: 'blue', value: 2 },
      ],
      [
        { suit: 'sub', value: 1 }, // Not captain card
        { suit: 'green', value: 3 },
      ],
    ];

    expect(() => detectCaptain(hands)).toThrow('Captain card (submarine 4) not found in any hand');
  });
});
