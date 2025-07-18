import type { Card } from './Card';

export type TrickPlays = {
  readonly [playerID: string]: Card;
};

export type Trick = {
  readonly leader: string;
  readonly plays: TrickPlays;
};

export type TrickRecord = {
  readonly leader: string;
  readonly winner: string;
  readonly cards: readonly Card[];
};
