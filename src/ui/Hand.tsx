import React from 'react';
import { Card as CardComponent } from './Card';
import type { Card } from '../types/Card';

interface HandProps {
  hand: Card[];
  onPlay: (idx: number) => void;
  isActive: boolean;
}

/**
 * Displays player's hand of cards horizontally sorted by suit.
 * Cards are clickable only when the hand is active.
 */
export function Hand({ hand, onPlay, isActive }: HandProps) {
  // Sort cards by suit first, then by value
  const sortedHand = [...hand].sort((a, b) => {
    // Define suit order: pink, blue, yellow, green, sub
    const suitOrder = { pink: 0, blue: 1, yellow: 2, green: 3, sub: 4 };

    if (a.suit !== b.suit) {
      return suitOrder[a.suit] - suitOrder[b.suit];
    }

    return a.value - b.value;
  });

  const handleCardClick = (originalIndex: number) => {
    if (isActive) {
      onPlay(originalIndex);
    }
  };

  return (
    <div className="flex gap-2 p-4">
      {sortedHand.map((card, sortedIndex) => {
        // Find the original index of this card in the unsorted hand
        let originalIndex = -1;
        const usedIndices = new Set<number>();

        // For each card in sorted order, find its original index
        for (let i = 0; i < sortedIndex; i += 1) {
          const prevCard = sortedHand[i];
          const foundIndex = hand.findIndex(
            (originalCard, idx) =>
              originalCard.suit === prevCard.suit &&
              originalCard.value === prevCard.value &&
              !usedIndices.has(idx),
          );
          if (foundIndex !== -1) {
            usedIndices.add(foundIndex);
          }
        }

        // Now find the original index for the current card
        originalIndex = hand.findIndex(
          (originalCard, idx) =>
            originalCard.suit === card.suit &&
            originalCard.value === card.value &&
            !usedIndices.has(idx),
        );

        return (
          <button
            key={`${card.suit}-${card.value}-${originalIndex}`}
            type="button"
            onClick={() => handleCardClick(originalIndex)}
            className={`transition-transform ${
              isActive ? 'hover:scale-105 hover:-translate-y-2' : 'cursor-not-allowed opacity-75'
            }`}
            disabled={!isActive}
          >
            <CardComponent card={card} selectable={isActive} disabled={!isActive} />
          </button>
        );
      })}
    </div>
  );
}
