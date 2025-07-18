import { describe, it, expect } from 'vitest';
import { CrewGame } from '../CrewGame';
import type { Card } from '../../types';

describe('playCard integration', () => {
  it('should complete a full trick with 4 players', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);

    expect(G.trickHistory).toHaveLength(0);
    expect(G.cardsPlayed).toBe(0);

    // Get the initial hands to track changes
    const initialHandSizes = Object.fromEntries(
      Object.entries(G.players).map(([id, player]) => [id, player.hand.length]),
    );

    // Captain should be the leader
    expect(G.trick.leader).toBe(G.captain);

    // Play cards from each player in order
    const { move } = CrewGame.moves!.playCard;

    // Player 0 (captain) leads
    ctx.currentPlayer = '0';
    const leadCard = G.players['0'].hand[0];
    move(G, ctx, 0);
    expect(Object.keys(G.trick.plays)).toHaveLength(1);
    const ledSuit = leadCard.suit;

    // Helper function to find a valid card for a player
    const findValidCard = (playerID: string): number => {
      const { hand } = G.players[playerID];
      // First try to find a card of the led suit
      const suitMatch = hand.findIndex((card) => card.suit === ledSuit);
      if (suitMatch !== -1) return suitMatch;

      // If no suit match, any card is valid (player can't follow suit)
      return 0;
    };

    // Player 1 follows
    ctx.currentPlayer = '1';
    const player1CardIdx = findValidCard('1');
    move(G, ctx, player1CardIdx);
    expect(Object.keys(G.trick.plays)).toHaveLength(2);

    // Player 2 follows
    ctx.currentPlayer = '2';
    const player2CardIdx = findValidCard('2');
    move(G, ctx, player2CardIdx);
    expect(Object.keys(G.trick.plays)).toHaveLength(3);

    // Player 3 completes trick
    ctx.currentPlayer = '3';
    const player3CardIdx = findValidCard('3');
    move(G, ctx, player3CardIdx);

    // Trick should be completed
    expect(G.trickHistory).toHaveLength(1);
    expect(G.cardsPlayed).toBe(4);
    expect(Object.keys(G.trick.plays)).toHaveLength(0); // New trick started

    // Winner should be the new leader
    const trickRecord = G.trickHistory[0];
    expect(G.trick.leader).toBe(trickRecord.winner);

    // Each player should have one less card
    Object.entries(G.players).forEach(([id, player]) => {
      expect(player.hand).toHaveLength(initialHandSizes[id] - 1);
    });
  });

  it('should reject invalid card plays', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);

    const handSize = G.players['0'].hand.length;

    // Try to play a card that doesn't exist (out of bounds)
    const { move } = CrewGame.moves!.playCard;
    const result = move(G, ctx, handSize); // Invalid index

    // Should return INVALID_MOVE and state unchanged
    expect(result).toBe('INVALID_MOVE');
    expect(Object.keys(G.trick.plays)).toHaveLength(0);
  });

  it('should enforce follow-suit rules', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);

    // Player 0 leads with first card
    const leadCard = G.players['0'].hand[0];
    const { move } = CrewGame.moves!.playCard;
    move(G, ctx, 0);

    // Check if player 1 has cards of the led suit
    ctx.currentPlayer = '1';
    const nextHand = G.players['1'].hand;
    const ledSuit = leadCard.suit;
    const hasSuit = nextHand.some((card: Card) => card.suit === ledSuit);

    if (hasSuit) {
      // Find a card of different suit to try to play illegally
      const offSuitCardIndex = nextHand.findIndex((card: Card) => card.suit !== ledSuit);

      if (offSuitCardIndex !== -1) {
        const stateBefore = JSON.parse(JSON.stringify(G));
        const result = move(G, ctx, offSuitCardIndex); // Should be invalid

        // Move should be rejected
        expect(result).toBe('INVALID_MOVE');
        // State should be unchanged (only trick.plays should be the same)
        expect(Object.keys(G.trick.plays)).toEqual(Object.keys(stateBefore.trick.plays));
      }
    }
  });

  it('should handle 3-player game correctly', () => {
    const ctx = { numPlayers: 3, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);

    const totalCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );

    // 3-player game should have 40 cards total but only 39 will be played
    expect(totalCards).toBe(40);

    // Playing cards should work the same way
    const { move } = CrewGame.moves!.playCard;
    move(G, ctx, 0);
    expect(Object.keys(G.trick.plays)).toHaveLength(1);
  });
});
