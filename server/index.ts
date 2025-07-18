import { Server } from 'boardgame.io/dist/cjs/server.js';
import type { Game, Ctx } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';
import type { Card, Trick, TrickRecord } from '../src/types';
import { createDeck, dealCards } from '../src/game/deck';
import { detectCaptain } from '../src/game/setupHelpers';
import { canPlayCard } from '../src/game/guards';
import { getTrickWinner } from '../src/game/winner';

type GameState = {
  readonly players: { readonly [id: string]: { readonly hand: readonly Card[] } };
  readonly deck: readonly Card[];
  readonly captain: string;
  readonly trick: Trick;
  readonly trickHistory: readonly TrickRecord[];
  readonly cardsPlayed: number;
};

/**
 * Ends the current trick, determines winner, and sets up next trick.
 * @param G Game state to modify
 * @param ctx Game context for player information
 */
function endTrick(G: GameState, ctx: Ctx): void {
  const winner = getTrickWinner(G.trick.plays);
  const playedCards = Object.values(G.trick.plays);

  // Add to trick history
  const trickRecord: TrickRecord = {
    leader: G.trick.leader,
    winner,
    cards: playedCards,
  };

  // Update game state immutably
  Object.assign(G, {
    trickHistory: [...G.trickHistory, trickRecord],
    cardsPlayed: G.cardsPlayed + Object.keys(G.trick.plays).length,
    trick: {
      leader: winner,
      plays: {},
    },
  });
}

/**
 * Move function for playing a card from player's hand.
 * @param G Game state
 * @param ctx Game context
 * @param cardIdx Index of card in player's hand to play
 */
function playCard(G: GameState, ctx: Ctx, cardIdx: number) {
  const playerID = ctx.currentPlayer;
  const playerHand = G.players[playerID]?.hand;

  if (!playerHand || cardIdx < 0 || cardIdx >= playerHand.length) {
    return INVALID_MOVE;
  }

  const card = playerHand[cardIdx];

  // Validate the card can be played
  if (!canPlayCard(G, playerID, card)) {
    return INVALID_MOVE;
  }

  // Remove card from hand and add to trick
  const newHand = playerHand.filter((_, index) => index !== cardIdx);
  const newPlays = { ...G.trick.plays, [playerID]: card };

  // Update game state immutably
  Object.assign(G, {
    players: {
      ...G.players,
      [playerID]: { hand: newHand },
    },
    trick: {
      ...G.trick,
      plays: newPlays,
    },
  });

  // Check if trick is complete
  const numPlays = Object.keys(newPlays).length;
  const maxCardsForRound = ctx.numPlayers === 3 ? 39 : 40;
  const remainingCards = maxCardsForRound - G.cardsPlayed;

  if (numPlays === ctx.numPlayers || numPlays === remainingCards) {
    endTrick(G, ctx);
  }
}

export const CrewGame: Game<GameState> = {
  name: 'crew',
  setup: (ctx) => {
    const deck = createDeck();
    const hands = dealCards(ctx.numPlayers, deck);
    const captain = detectCaptain(hands);

    const players: { [id: string]: { hand: Card[] } } = {};
    for (let i = 0; i < ctx.numPlayers; i += 1) {
      players[i.toString()] = { hand: hands[i] };
    }

    return {
      players,
      deck: [], // Empty after dealing all cards
      captain: captain.toString(),
      trick: {
        leader: captain.toString(),
        plays: {},
      },
      trickHistory: [],
      cardsPlayed: 0,
    };
  },
  moves: {
    playCard: {
      move: playCard,
      client: false,
    },
  },
};

const server = Server({
  games: [CrewGame],
  origins: ['http://localhost:5173'],
});

server.run(
  {
    port: 8000,
  },
  () => {
    console.log('Serving boardgame.io on port 8000');
  },
);
