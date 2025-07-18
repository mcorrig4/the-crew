import { Server } from 'boardgame.io/dist/cjs/server.js';
import type { Game } from 'boardgame.io';

export const CrewGame: Game = {
  name: 'crew',
  setup: () => ({}),
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
