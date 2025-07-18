import type { Card, Suit } from '../types/Card';

export function createDeck(): Card[] {
  const deck: Card[] = [];

  // Add colored cards (pink, blue, yellow, green) - 1 through 9
  const colorSuits: Suit[] = ['pink', 'blue', 'yellow', 'green'];
  colorSuits.forEach((suit) => {
    for (let value = 1; value <= 9; value += 1) {
      deck.push({ suit, value });
    }
  });

  // Add submarine cards - 1 through 4
  for (let value = 1; value <= 4; value += 1) {
    deck.push({ suit: 'sub', value });
  }

  return deck;
}
