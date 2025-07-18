import { Server } from 'boardgame.io/dist/cjs/server.js';
import type { Game } from 'boardgame.io';
import type { Card } from '../src/types/Card';
import { createDeck, dealCards } from '../src/game/deck';
import { detectCaptain } from '../src/game/setupHelpers';

interface GameState {
  players: { [id: string]: { hand: Card[] } };
  deck: Card[];
  captain: string;
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
    };
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
