import type { Card } from '../types';

type GameState = {
  readonly players: { readonly [id: string]: { readonly hand: readonly Card[] } };
  readonly trick: {
    readonly leader: string;
    readonly plays: { readonly [playerID: string]: Card };
  };
};

/**
 * Determines if a player can legally play a specific card.
 * Enforces follow-suit rules and submarine trump logic.
 * @param G Game state containing player hands and current trick
 * @param playerID The player attempting to play a card
 * @param card The card being played
 */
export function canPlayCard(G: GameState, playerID: string, card: Card): boolean {
  const playerHand = G.players[playerID]?.hand;
  if (!playerHand) {
    return false;
  }

  // Check if player actually has this card
  const hasCard = playerHand.some(
    (handCard) => handCard.suit === card.suit && handCard.value === card.value,
  );
  if (!hasCard) {
    return false;
  }

  // If this is the first card of the trick, any card can be played
  const playsArray = Object.values(G.trick.plays);
  if (playsArray.length === 0) {
    return true;
  }

  // Determine the led suit (first card played)
  const ledSuit = playsArray[0].suit;

  // If the card matches the led suit, it can be played
  if (card.suit === ledSuit) {
    return true;
  }

  // If player doesn't have any cards of the led suit, any card can be played
  const hasLedSuit = playerHand.some((handCard) => handCard.suit === ledSuit);
  return !hasLedSuit;
}
