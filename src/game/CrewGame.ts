import type { Game, Ctx } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';
import type { Card, Trick, TrickRecord } from '../types';
import { createDeck, dealCards } from './deck';
import { detectCaptain } from './setupHelpers';
import { canPlayCard } from './guards';
import { getTrickWinner } from './winner';

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function endTrick(G: GameState, _ctx: Ctx): void {
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
  const numPlayers = ctx.numPlayers as number;
  const maxCardsForRound = numPlayers === 3 ? 39 : 40;
  const remainingCards = maxCardsForRound - G.cardsPlayed;

  if (numPlays === numPlayers || numPlays === remainingCards) {
    endTrick(G, ctx);
  }

  return undefined;
}

export const CrewGame: Game<GameState> = {
  name: 'crew',
  setup: (ctx) => {
    const deck = createDeck();
    const hands = dealCards(ctx.numPlayers as number, deck);
    const captain = detectCaptain(hands);

    const players: { [id: string]: { hand: Card[] } } = {};
    for (let i = 0; i < (ctx.numPlayers as number); i += 1) {
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

export type { GameState };
