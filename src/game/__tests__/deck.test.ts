import { describe, it, expect } from 'vitest';
import { createDeck, dealCards } from '../deck';

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

describe('dealCards', () => {
  const deck = createDeck();

  it('should deal 10 cards to each player in a 4-player game', () => {
    const hands = dealCards(4, deck);
    expect(hands).toHaveLength(4);
    hands.forEach((hand) => {
      expect(hand).toHaveLength(10);
    });

    // Verify all 40 cards are distributed
    const totalCards = hands.flat().length;
    expect(totalCards).toBe(40);
  });

  it('should deal 8 cards to each player in a 5-player game', () => {
    const hands = dealCards(5, deck);
    expect(hands).toHaveLength(5);
    hands.forEach((hand) => {
      expect(hand).toHaveLength(8);
    });

    // Verify all 40 cards are distributed
    const totalCards = hands.flat().length;
    expect(totalCards).toBe(40);
  });

  it('should deal 14 cards to seat 0 and 13 cards to seats 1-2 in a 3-player game', () => {
    const hands = dealCards(3, deck);
    expect(hands).toHaveLength(3);
    expect(hands[0]).toHaveLength(14); // Seat 0 gets the extra card
    expect(hands[1]).toHaveLength(13);
    expect(hands[2]).toHaveLength(13);

    // Verify all 40 cards are distributed
    const totalCards = hands.flat().length;
    expect(totalCards).toBe(40);
  });

  it('should throw an error for invalid number of players', () => {
    expect(() => dealCards(2, deck)).toThrow('Invalid number of players: 2. Must be 3, 4, or 5.');
    expect(() => dealCards(6, deck)).toThrow('Invalid number of players: 6. Must be 3, 4, or 5.');
  });

  it('should distribute all cards without duplication', () => {
    const hands = dealCards(4, deck);
    const allDealtCards = hands.flat();

    // Check that no cards are duplicated
    const cardStrings = allDealtCards.map((card) => `${card.suit}-${card.value}`);
    const uniqueCardStrings = new Set(cardStrings);
    expect(uniqueCardStrings.size).toBe(40);
  });
});
