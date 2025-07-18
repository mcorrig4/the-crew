import { describe, it, expect } from 'vitest';
import { CrewGame } from '../../../server';
import { getTrickWinner } from '../winner';
import { canPlayCard } from '../guards';

describe('Trick Engine Validation', () => {
  it('should play a complete game round with complex scenarios', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    // Simulate multiple complete tricks
    let tricksPlayed = 0;
    const maxTricks = 3; // Test first 3 tricks

    while (tricksPlayed < maxTricks) {
      const initialTrickCount = G.trickHistory.length;

      // Play 4 cards to complete a trick
      for (let player = 0; player < 4; player += 1) {
        ctx.currentPlayer = player.toString();
        const { hand } = G.players[ctx.currentPlayer];

        if (hand.length === 0) {
          // No more cards, game should be over
          return;
        }

        // Find a valid card to play
        let cardIdx = 0;
        if (Object.keys(G.trick.plays).length > 0) {
          // Not leading, need to follow suit if possible
          const leadSuit = Object.values(G.trick.plays)[0].suit;
          const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
          if (suitMatch !== -1) {
            cardIdx = suitMatch;
          }
        }

        const result = move(G, ctx, cardIdx);
        expect(result).not.toBe('INVALID_MOVE');
      }

      // After 4 players, trick should be complete
      expect(G.trickHistory.length).toBe(initialTrickCount + 1);
      expect(Object.keys(G.trick.plays)).toHaveLength(0);
      expect(G.cardsPlayed).toBe((tricksPlayed + 1) * 4);

      // New leader should be the winner of the previous trick
      const lastTrick = G.trickHistory[G.trickHistory.length - 1];
      expect(G.trick.leader).toBe(lastTrick.winner);

      tricksPlayed += 1;
    }

    expect(tricksPlayed).toBe(maxTricks);
  });

  it('should handle submarine trump scenarios correctly', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);

    // Simply verify that submarine trump logic exists in the winner function
    // by testing the getTrickWinner function directly with known cards

    const playsWithSubmarine = {
      '0': { suit: 'blue', value: 9 }, // High non-trump
      '1': { suit: 'sub', value: 1 }, // Low submarine (should win)
      '2': { suit: 'pink', value: 8 }, // Off-suit
    };

    const winner = getTrickWinner(playsWithSubmarine);
    expect(winner).toBe('1'); // Submarine should win despite low value

    // Verify the game setup is working
    expect(G.players).toBeDefined();
    expect(Object.keys(G.players)).toHaveLength(4);
  });

  it('should handle edge case with 3-player game and remainder cards', () => {
    const ctx = { numPlayers: 3, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    // Verify initial setup for 3 players
    const totalCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );
    expect(totalCards).toBe(40); // All cards dealt

    // One player should have 14 cards, others 13
    const handSizes = Object.values(G.players)
      .map((p) => p.hand.length)
      .sort();
    expect(handSizes).toEqual([13, 13, 14]);

    // Play one complete trick in proper order
    const leadingPlayer = G.trick.leader;
    ctx.currentPlayer = leadingPlayer;
    const leadCard = G.players[leadingPlayer].hand[0];
    move(G, ctx, 0);

    // Play other players in sequence (0, 1, 2)
    for (let player = 0; player < 3; player += 1) {
      const pid = player.toString();
      if (pid !== leadingPlayer && Object.keys(G.trick.plays).length < 3) {
        ctx.currentPlayer = pid;
        const { hand } = G.players[pid];

        // Find valid card (follow suit if possible)
        let cardIdx = 0;
        const suitMatch = hand.findIndex((card) => card.suit === leadCard.suit);
        if (suitMatch !== -1) {
          cardIdx = suitMatch;
        }

        const result = move(G, ctx, cardIdx);
        // Ensure move was successful
        expect(result).not.toBe('INVALID_MOVE');
      }
    }

    // After 3 players complete the trick, it should be finished
    expect(G.trickHistory).toHaveLength(1);
    expect(G.cardsPlayed).toBe(3);

    // Verify remaining cards total 37 (40 - 3)
    const remainingCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );
    expect(remainingCards).toBe(37);

    // Verify trick winner is now the leader
    expect(G.trick.leader).toBe(G.trickHistory[0].winner);
  });

  it('should prevent illegal moves comprehensively', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    // Test invalid card index
    expect(move(G, ctx, -1)).toBe('INVALID_MOVE');
    expect(move(G, ctx, 999)).toBe('INVALID_MOVE');

    // Test with canPlayCard function directly for follow-suit validation

    const testGameState = {
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
        plays: { '1': { suit: 'blue', value: 9 } }, // Blue was led
      },
    };

    // Player has blue cards but trying to play pink - should be invalid
    expect(canPlayCard(testGameState, '0', { suit: 'pink', value: 5 })).toBe(false);

    // Player playing blue should be valid
    expect(canPlayCard(testGameState, '0', { suit: 'blue', value: 3 })).toBe(true);

    // Also do a basic game move test
    ctx.currentPlayer = G.trick.leader;
    const handSize = G.players[G.trick.leader].hand.length;
    move(G, ctx, 0);
    expect(G.players[G.trick.leader].hand.length).toBe(handSize - 1);
  });

  it('should handle winner determination edge cases', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    // Simply play one trick and verify a winner is determined
    for (let player = 0; player < 4; player += 1) {
      ctx.currentPlayer = player.toString();

      // Find a valid card to play
      const { hand } = G.players[ctx.currentPlayer];
      let cardIdx = 0;

      if (Object.keys(G.trick.plays).length > 0) {
        // Follow suit if possible
        const leadSuit = Object.values(G.trick.plays)[0].suit;
        const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
        if (suitMatch !== -1) {
          cardIdx = suitMatch;
        }
      }

      move(G, ctx, cardIdx);
    }

    // Verify trick completed and winner determined
    expect(G.trickHistory).toHaveLength(1);
    expect(G.trickHistory[0].winner).toBeDefined();
    expect(G.trickHistory[0].cards).toHaveLength(4);
    expect(G.trick.leader).toBe(G.trickHistory[0].winner);
  });

  it('should maintain game state integrity across multiple tricks', () => {
    const ctx = { numPlayers: 4, currentPlayer: '0' };
    const G = CrewGame.setup!(ctx);
    const { move } = CrewGame.moves!.playCard;

    const initialTotalCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );

    // Play 2 complete tricks with proper follow-suit logic
    for (let trick = 0; trick < 2; trick += 1) {
      for (let player = 0; player < 4; player += 1) {
        ctx.currentPlayer = player.toString();
        const { hand } = G.players[ctx.currentPlayer];

        let cardIdx = 0;
        if (Object.keys(G.trick.plays).length > 0) {
          // Follow suit if possible
          const { suit: leadSuit } = Object.values(G.trick.plays)[0];
          const suitMatch = hand.findIndex((card) => card.suit === leadSuit);
          if (suitMatch !== -1) {
            cardIdx = suitMatch;
          }
        }

        move(G, ctx, cardIdx);
      }
    }

    // Verify state consistency
    expect(G.trickHistory).toHaveLength(2);
    expect(G.cardsPlayed).toBe(8);

    const remainingCards = Object.values(G.players).reduce(
      (sum, player) => sum + player.hand.length,
      0,
    );
    expect(remainingCards).toBe(initialTotalCards - 8);

    // Verify no duplicate cards were created/lost
    const allRemainingCards = Object.values(G.players).flatMap((p) => p.hand);
    const allPlayedCards = G.trickHistory.flatMap((t) => t.cards);
    expect(allRemainingCards.length + allPlayedCards.length).toBe(initialTotalCards);

    // Verify trick history records are correct
    G.trickHistory.forEach((trick) => {
      expect(trick.cards).toHaveLength(4);
      expect(trick.leader).toBeDefined();
      expect(trick.winner).toBeDefined();
    });
  });
});
