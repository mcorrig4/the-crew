import { describe, it, expect } from 'vitest';
import { createDeck } from '../deck';

describe('createDeck', () => {
  it('should return exactly 40 cards', () => {
    const deck = createDeck();
    expect(deck).toHaveLength(40);
  });

  it('should contain all unique (suit, value) pairs', () => {
    const deck = createDeck();
    const uniquePairs = new Set(deck.map((card) => `${card.suit}-${card.value}`));
    expect(uniquePairs.size).toBe(40);
  });

  it('should contain exactly four submarine cards', () => {
    const deck = createDeck();
    const submarineCards = deck.filter((card) => card.suit === 'sub');
    expect(submarineCards).toHaveLength(4);

    // Check submarine values are 1, 2, 3, 4
    const subValues = submarineCards.map((card) => card.value).sort();
    expect(subValues).toEqual([1, 2, 3, 4]);
  });

  it('should contain 9 cards for each colored suit', () => {
    const deck = createDeck();
    const colorSuits = ['pink', 'blue', 'yellow', 'green'];

    colorSuits.forEach((suit) => {
      const suitCards = deck.filter((card) => card.suit === suit);
      expect(suitCards).toHaveLength(9);

      // Check values are 1 through 9
      const values = suitCards.map((card) => card.value).sort();
      expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});
