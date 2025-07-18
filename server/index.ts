import { Server } from 'boardgame.io/server';
import { CrewGame } from '../src/game/CrewGame';

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
