import type { Card } from '../types/Card';

export function detectCaptain(hands: Card[][]): number {
  for (let playerIndex = 0; playerIndex < hands.length; playerIndex += 1) {
    const hand = hands[playerIndex];
    const hasCaptainCard = hand.some((card) => card.suit === 'sub' && card.value === 4);
    if (hasCaptainCard) {
      return playerIndex;
    }
  }
  throw new Error('Captain card (submarine 4) not found in any hand');
}
