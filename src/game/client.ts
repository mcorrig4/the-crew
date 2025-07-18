import { Client } from 'boardgame.io/react';
import { CrewGame } from './CrewGame';

export const createClient = () =>
  Client({
    game: CrewGame,
    multiplayer: { server: 'http://localhost:8000' },
  });
