export type Suit = 'pink' | 'blue' | 'yellow' | 'green' | 'sub';

export interface Card {
  suit: Suit;
  value: number; // value 1-9, sub 1-4
}
