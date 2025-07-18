import type { Card, Suit } from '../types/Card';

// Fisher-Yates shuffle algorithm
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

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

export function dealCards(players: number, deck: Card[]): Card[][] {
  const shuffledDeck = shuffle(deck);
  const hands: Card[][] = [];

  // Initialize empty hands for each player
  for (let i = 0; i < players; i += 1) {
    hands.push([]);
  }

  let cardsPerPlayer: number;
  let remainderCards: number;

  if (players === 3) {
    cardsPerPlayer = 13;
    remainderCards = 1; // One player gets 14 cards (seat 0)
  } else if (players === 4) {
    cardsPerPlayer = 10;
    remainderCards = 0;
  } else if (players === 5) {
    cardsPerPlayer = 8;
    remainderCards = 0;
  } else {
    throw new Error(`Invalid number of players: ${players}. Must be 3, 4, or 5.`);
  }

  let cardIndex = 0;

  // Deal base cards to each player
  for (let round = 0; round < cardsPerPlayer; round += 1) {
    for (let player = 0; player < players; player += 1) {
      hands[player].push(shuffledDeck[cardIndex]);
      cardIndex += 1;
    }
  }

  // Deal remainder cards for 3-player game (seat 0 gets extra card)
  for (let i = 0; i < remainderCards; i += 1) {
    hands[0].push(shuffledDeck[cardIndex]);
    cardIndex += 1;
  }

  return hands;
}
