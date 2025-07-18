import { describe, it, expect } from 'vitest';
import { CrewGame } from '../CrewGame';

describe('CrewGame setup', () => {
  it('should distribute all 40 cards for 4 players', () => {
    const ctx = { numPlayers: 4, playerID: '0' };
    const G = CrewGame.setup!(ctx);

    // Check that all 4 players have hands
    expect(Object.keys(G.players)).toHaveLength(4);

    // Check card distribution (4 players × 10 cards = 40 total)
    let totalCards = 0;
    for (let i = 0; i < 4; i += 1) {
      const playerId = i.toString();
      const playerHand = G.players[playerId].hand;
      expect(playerHand).toHaveLength(10);
      totalCards += playerHand.length;
    }
    expect(totalCards).toBe(40);

    // Deck should be empty after dealing
    expect(G.deck).toHaveLength(0);
  });

  it('should have captain index within valid range', () => {
    const ctx = { numPlayers: 4, playerID: '0' };
    const G = CrewGame.setup!(ctx);

    const captainId = parseInt(G.captain, 10);
    expect(captainId).toBeGreaterThanOrEqual(0);
    expect(captainId).toBeLessThan(4);
  });

  it('should work correctly for 3 players with remainder rule', () => {
    const ctx = { numPlayers: 3, playerID: '0' };
    const G = CrewGame.setup!(ctx);

    // Check that all 3 players have hands
    expect(Object.keys(G.players)).toHaveLength(3);

    // Check card distribution (3 players: 14 + 13 + 13 = 40 total)
    const handSizes = [];
    for (let i = 0; i < 3; i += 1) {
      const playerId = i.toString();
      const playerHand = G.players[playerId].hand;
      handSizes.push(playerHand.length);
    }

    // One player should have 14 cards (seat 0), others should have 13
    handSizes.sort();
    expect(handSizes).toEqual([13, 13, 14]);

    // Total should be 40
    const totalCards = handSizes.reduce((sum, count) => sum + count, 0);
    expect(totalCards).toBe(40);
  });

  it('should work correctly for 5 players', () => {
    const ctx = { numPlayers: 5, playerID: '0' };
    const G = CrewGame.setup!(ctx);

    // Check that all 5 players have hands
    expect(Object.keys(G.players)).toHaveLength(5);

    // Check card distribution (5 players × 8 cards = 40 total)
    let totalCards = 0;
    for (let i = 0; i < 5; i += 1) {
      const playerId = i.toString();
      const playerHand = G.players[playerId].hand;
      expect(playerHand).toHaveLength(8);
      totalCards += playerHand.length;
    }
    expect(totalCards).toBe(40);
  });

  it('should always identify a captain (player with submarine 4)', () => {
    const ctx = { numPlayers: 4, playerID: '0' };
    const G = CrewGame.setup!(ctx);

    // Find the captain and check they have submarine 4
    const captainId = G.captain;
    const captainHand = G.players[captainId].hand;

    const hasCaptainCard = captainHand.some((card) => card.suit === 'sub' && card.value === 4);
    expect(hasCaptainCard).toBe(true);
  });
});
