import { describe, it, expect } from 'vitest';
import { CrewGame } from '../../../server';
import { getTrickWinner } from '../winner';
import { canPlayCard } from '../guards';
import type { Card } from '../../types';

describe('Comprehensive Trick Engine Validation', () => {
  it('should simulate a complete 4-player game to completion', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    const initialCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );
    expect(initialCards).toBe(40);

    let tricksCompleted = 0;
    const maxTricks = 10; // Should be able to complete 10 full tricks (40 cards)

    // Simulate playing full game
    while (tricksCompleted < maxTricks && Object.values(G.players).some((p) => p.hand.length > 0)) {
      const trickStartCards = G.cardsPlayed;

      // Play one complete trick
      for (let playerTurn = 0; playerTurn < 4; playerTurn += 1) {
        const currentPlayer = playerTurn.toString();
        ctx.currentPlayer = currentPlayer;

        const { hand } = G.players[currentPlayer];
        if (hand.length === 0) break; // No more cards

        // Find valid card
        let cardIdx = 0;
        if (Object.keys(G.trick.plays).length > 0) {
          const { suit: leadSuit } = Object.values(G.trick.plays)[0];
          const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
          if (suitMatch !== -1) {
            cardIdx = suitMatch;
          }
        }

        const result = move(G, ctx, cardIdx);
        expect(result).not.toBe('INVALID_MOVE');
      }

      // Verify trick completed
      if (G.cardsPlayed > trickStartCards) {
        tricksCompleted += 1;
        expect(G.trickHistory.length).toBe(tricksCompleted);

        // Verify trick has winner and leader rotated
        const lastTrick = G.trickHistory[tricksCompleted - 1];
        expect(lastTrick.winner).toBeDefined();
        expect(lastTrick.cards).toHaveLength(4);
        expect(G.trick.leader).toBe(lastTrick.winner);
      }
    }

    expect(tricksCompleted).toBeGreaterThan(8); // Should complete most of the game
    expect(G.cardsPlayed).toBeGreaterThan(32); // Most cards should be played
  });

  it('should handle all submarine trump scenarios correctly', () => {
    // Test all submarine values beating regular cards
    for (let subValue = 1; subValue <= 4; subValue += 1) {
      const plays = {
        '0': { suit: 'blue', value: 9 } as Card, // Highest regular card
        '1': { suit: 'sub', value: subValue } as Card, // Submarine
        '2': { suit: 'pink', value: 8 } as Card, // High off-suit
      };

      const winner = getTrickWinner(plays);
      expect(winner).toBe('1'); // Submarine should always win
    }

    // Test submarine vs submarine
    const multiSubPlays = {
      '0': { suit: 'sub', value: 1 } as Card,
      '1': { suit: 'sub', value: 4 } as Card, // Should win
      '2': { suit: 'sub', value: 2 } as Card,
    };

    expect(getTrickWinner(multiSubPlays)).toBe('1'); // Highest submarine
  });

  it('should handle all follow-suit edge cases', () => {
    // Player has led suit - must follow
    const mustFollowState = {
      players: {
        '0': {
          hand: [
            { suit: 'blue', value: 3 },
            { suit: 'pink', value: 5 },
          ],
        },
      },
      trick: {
        leader: '1',
        plays: { '1': { suit: 'blue', value: 9 } },
      },
    };

    // Can play blue (has led suit)
    expect(canPlayCard(mustFollowState, '0', { suit: 'blue', value: 3 })).toBe(true);
    // Cannot play pink (has led suit available)
    expect(canPlayCard(mustFollowState, '0', { suit: 'pink', value: 5 })).toBe(false);

    // Player doesn't have led suit - can play anything
    const canPlayAnythingState = {
      players: {
        '0': {
          hand: [
            { suit: 'pink', value: 5 },
            { suit: 'sub', value: 2 },
          ],
        },
      },
      trick: {
        leader: '1',
        plays: { '1': { suit: 'blue', value: 9 } },
      },
    };

    expect(canPlayCard(canPlayAnythingState, '0', { suit: 'pink', value: 5 })).toBe(true);
    expect(canPlayCard(canPlayAnythingState, '0', { suit: 'sub', value: 2 })).toBe(true);

    // Leading player can play anything
    const leadingState = {
      players: {
        '0': {
          hand: [
            { suit: 'blue', value: 3 },
            { suit: 'sub', value: 1 },
          ],
        },
      },
      trick: {
        leader: '0',
        plays: {},
      },
    };

    expect(canPlayCard(leadingState, '0', { suit: 'blue', value: 3 })).toBe(true);
    expect(canPlayCard(leadingState, '0', { suit: 'sub', value: 1 })).toBe(true);
  });

  it('should maintain perfect state consistency across complex scenarios', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    // Track all cards throughout the game
    const allOriginalCards: Card[] = [];
    Object.values(G.players).forEach((player) => {
      allOriginalCards.push(...player.hand);
    });
    expect(allOriginalCards).toHaveLength(40);

    // Play 3 complete tricks
    for (let trick = 0; trick < 3; trick += 1) {
      const beforeTrickCards = Object.values(G.players).reduce(
        (sum, player) => sum + player.hand.length,
        0,
      );

      for (let player = 0; player < 4; player += 1) {
        ctx.currentPlayer = player.toString();
        const { hand } = G.players[ctx.currentPlayer];

        let cardIdx = 0;
        if (Object.keys(G.trick.plays).length > 0) {
          const { suit: leadSuit } = Object.values(G.trick.plays)[0];
          const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
          if (suitMatch !== -1) {
            cardIdx = suitMatch;
          }
        }

        move(G, ctx, cardIdx);
      }

      // Verify exactly 4 cards were played this trick
      const afterTrickCards = Object.values(G.players).reduce(
        (sum, player) => sum + player.hand.length,
        0,
      );
      expect(beforeTrickCards - afterTrickCards).toBe(4);

      // Verify trick history is accurate
      expect(G.trickHistory[trick].cards).toHaveLength(4);
      expect(G.cardsPlayed).toBe((trick + 1) * 4);
    }

    // Verify no cards were duplicated or lost
    const remainingCards: Card[] = [];
    Object.values(G.players).forEach((player) => {
      remainingCards.push(...player.hand);
    });

    const playedCards: Card[] = [];
    G.trickHistory.forEach((trick) => {
      playedCards.push(...trick.cards);
    });

    expect(remainingCards.length + playedCards.length).toBe(40);

    // Verify no duplicate cards exist
    const allCurrentCards = [...remainingCards, ...playedCards];
    const cardStrings = allCurrentCards.map((card) => `${card.suit}-${card.value}`);
    const uniqueCardStrings = [...new Set(cardStrings)];
    expect(uniqueCardStrings).toHaveLength(40); // All cards should be unique
  });

  it('should handle 3-player game remainder logic perfectly', () => {
    const ctx = { numPlayers: 3, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    // Verify initial distribution
    const handSizes = Object.values(G.players)
      .map((p) => p.hand.length)
      .sort();
    expect(handSizes).toEqual([13, 13, 14]); // One player has extra card

    let tricksPlayed = 0;

    // Play until we can't complete full tricks anymore
    while (tricksPlayed < 13) {
      // Maximum possible tricks in 3-player
      const playersWithCards = Object.values(G.players).filter((p) => p.hand.length > 0);
      if (playersWithCards.length < 3) break;

      // Play one trick
      for (let player = 0; player < 3; player += 1) {
        ctx.currentPlayer = player.toString();
        const { hand } = G.players[ctx.currentPlayer];

        if (hand.length === 0) break;

        let cardIdx = 0;
        if (Object.keys(G.trick.plays).length > 0) {
          const { suit: leadSuit } = Object.values(G.trick.plays)[0];
          const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
          if (suitMatch !== -1) {
            cardIdx = suitMatch;
          }
        }

        move(G, ctx, cardIdx);
      }

      tricksPlayed += 1;
    }

    // Should have played exactly 39 cards (40 - 1 remainder)
    expect(G.cardsPlayed).toBe(39);
    expect(tricksPlayed).toBe(13);

    // Exactly one card should remain
    const remainingCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );
    expect(remainingCards).toBe(1);
  });

  it('should validate all card combinations and values', () => {
    // Test that deck contains exactly the right cards
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);

    const allCards: Card[] = [];
    Object.values(G.players).forEach((player) => {
      allCards.push(...player.hand);
    });

    // Count cards by suit
    const suitCounts = {
      pink: allCards.filter((c) => c.suit === 'pink').length,
      blue: allCards.filter((c) => c.suit === 'blue').length,
      yellow: allCards.filter((c) => c.suit === 'yellow').length,
      green: allCards.filter((c) => c.suit === 'green').length,
      sub: allCards.filter((c) => c.suit === 'sub').length,
    };

    expect(suitCounts.pink).toBe(9); // Values 1-9
    expect(suitCounts.blue).toBe(9); // Values 1-9
    expect(suitCounts.yellow).toBe(9); // Values 1-9
    expect(suitCounts.green).toBe(9); // Values 1-9
    expect(suitCounts.sub).toBe(4); // Values 1-4

    // Verify all values are present for each suit
    ['pink', 'blue', 'yellow', 'green'].forEach((suit) => {
      for (let value = 1; value <= 9; value += 1) {
        const hasCard = allCards.some((c) => c.suit === suit && c.value === value);
        expect(hasCard).toBe(true);
      }
    });

    // Verify submarine values 1-4
    for (let value = 1; value <= 4; value += 1) {
      const hasCard = allCards.some((c) => c.suit === 'sub' && c.value === value);
      expect(hasCard).toBe(true);
    }
  });

  it('should handle stress test with rapid game play', () => {
    // Run multiple complete games quickly
    for (let game = 0; game < 5; game += 1) {
      const ctx = { numPlayers: 4, currentPlayer: '0' };
      const G = CrewGame.setup!(ctx);
      const { move } = CrewGame.moves!.playCard;

      // Play 5 tricks rapidly
      for (let trick = 0; trick < 5; trick += 1) {
        for (let player = 0; player < 4; player += 1) {
          ctx.currentPlayer = player.toString();
          const { hand } = G.players[ctx.currentPlayer];

          if (hand.length === 0) break;

          let cardIdx = 0;
          if (Object.keys(G.trick.plays).length > 0) {
            const { suit: leadSuit } = Object.values(G.trick.plays)[0];
            const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
            if (suitMatch !== -1) {
              cardIdx = suitMatch;
            }
          }

          const result = move(G, ctx, cardIdx);
          expect(result).not.toBe('INVALID_MOVE');
        }
      }

      // Verify game state is consistent after rapid play
      expect(G.trickHistory.length).toBe(5);
      expect(G.cardsPlayed).toBe(20);

      const remainingCards = Object.values(G.players).reduce(
        (sum, player) => sum + player.hand.length,
        0,
      );
      expect(remainingCards).toBe(20);
    }
  });
});
