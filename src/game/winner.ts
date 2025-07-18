import type { Card } from '../types';

/**
 * Determines the winner of a completed trick.
 * Submarines (trumps) beat all other suits; highest value wins.
 * @param plays Map of playerID to card played in the trick
 */
export function getTrickWinner(plays: { readonly [playerID: string]: Card }): string {
  const playerEntries = Object.entries(plays);

  if (playerEntries.length === 0) {
    throw new Error('Cannot determine winner of empty trick');
  }

  // Find the led suit (first card played)
  const firstEntry = playerEntries[0];
  const ledSuit = firstEntry[1].suit;

  // Separate submarine cards from others
  const submarineCards: Array<[string, Card]> = [];
  const ledSuitCards: Array<[string, Card]> = [];

  playerEntries.forEach(([playerID, card]) => {
    if (card.suit === 'sub') {
      submarineCards.push([playerID, card]);
    } else if (card.suit === ledSuit) {
      ledSuitCards.push([playerID, card]);
    }
  });

  // If any submarine cards were played, highest submarine wins
  if (submarineCards.length > 0) {
    let winner = submarineCards[0];
    for (let i = 1; i < submarineCards.length; i += 1) {
      if (submarineCards[i][1].value > winner[1].value) {
        winner = submarineCards[i];
      }
    }
    return winner[0];
  }

  // Otherwise, highest card of the led suit wins
  if (ledSuitCards.length > 0) {
    let winner = ledSuitCards[0];
    for (let i = 1; i < ledSuitCards.length; i += 1) {
      if (ledSuitCards[i][1].value > winner[1].value) {
        winner = ledSuitCards[i];
      }
    }
    return winner[0];
  }

  // If no submarines and no led suit cards (shouldn't happen in valid play),
  // return the first player
  return firstEntry[0];
}
