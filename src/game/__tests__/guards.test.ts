import { describe, it, expect } from 'vitest';
import { canPlayCard } from '../guards';
import type { Card } from '../../types';

const createGameState = (playerHand: Card[], trickPlays: { [playerID: string]: Card } = {}) => ({
  players: {
    '0': { hand: playerHand },
    '1': { hand: [] },
  },
  trick: {
    leader: '0',
    plays: trickPlays,
  },
});

describe('canPlayCard', () => {
  it('should return false if player does not exist', () => {
    const G = createGameState([]);
    const card: Card = { suit: 'blue', value: 5 };

    expect(canPlayCard(G, 'nonexistent', card)).toBe(false);
  });

  it('should return false if player does not have the card', () => {
    const playerHand: Card[] = [
      { suit: 'blue', value: 3 },
      { suit: 'pink', value: 7 },
    ];
    const G = createGameState(playerHand);
    const card: Card = { suit: 'blue', value: 5 }; // Not in hand

    expect(canPlayCard(G, '0', card)).toBe(false);
  });

  it('should return true for any card when trick is empty (leading)', () => {
    const playerHand: Card[] = [
      { suit: 'blue', value: 3 },
      { suit: 'sub', value: 2 },
    ];
    const G = createGameState(playerHand);

    expect(canPlayCard(G, '0', { suit: 'blue', value: 3 })).toBe(true);
    expect(canPlayCard(G, '0', { suit: 'sub', value: 2 })).toBe(true);
  });

  it('should return true when playing a card of the led suit', () => {
    const playerHand: Card[] = [
      { suit: 'blue', value: 3 },
      { suit: 'blue', value: 7 },
      { suit: 'pink', value: 5 },
    ];
    const trickPlays = {
      '1': { suit: 'blue', value: 9 }, // Blue was led
    };
    const G = createGameState(playerHand, trickPlays);

    expect(canPlayCard(G, '0', { suit: 'blue', value: 3 })).toBe(true);
    expect(canPlayCard(G, '0', { suit: 'blue', value: 7 })).toBe(true);
  });

  it('should return false when not following suit and player has led suit', () => {
    const playerHand: Card[] = [
      { suit: 'blue', value: 3 },
      { suit: 'pink', value: 5 },
    ];
    const trickPlays = {
      '1': { suit: 'blue', value: 9 }, // Blue was led
    };
    const G = createGameState(playerHand, trickPlays);

    // Player has blue cards but trying to play pink
    expect(canPlayCard(G, '0', { suit: 'pink', value: 5 })).toBe(false);
  });

  it('should return true when player has no cards of led suit (can trump or discard)', () => {
    const playerHand: Card[] = [
      { suit: 'pink', value: 5 },
      { suit: 'sub', value: 2 }, // Submarine (trump)
      { suit: 'green', value: 8 },
    ];
    const trickPlays = {
      '1': { suit: 'blue', value: 9 }, // Blue was led
    };
    const G = createGameState(playerHand, trickPlays);

    // Player has no blue cards, can play any card
    expect(canPlayCard(G, '0', { suit: 'pink', value: 5 })).toBe(true);
    expect(canPlayCard(G, '0', { suit: 'sub', value: 2 })).toBe(true);
    expect(canPlayCard(G, '0', { suit: 'green', value: 8 })).toBe(true);
  });

  it('should handle submarine cards correctly when led', () => {
    const playerHand: Card[] = [
      { suit: 'sub', value: 1 },
      { suit: 'sub', value: 3 },
      { suit: 'blue', value: 5 },
    ];
    const trickPlays = {
      '1': { suit: 'sub', value: 2 }, // Submarine was led
    };
    const G = createGameState(playerHand, trickPlays);

    // Must follow submarine suit if player has submarines
    expect(canPlayCard(G, '0', { suit: 'sub', value: 1 })).toBe(true);
    expect(canPlayCard(G, '0', { suit: 'sub', value: 3 })).toBe(true);
    expect(canPlayCard(G, '0', { suit: 'blue', value: 5 })).toBe(false);
  });
});
