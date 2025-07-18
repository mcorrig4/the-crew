import React from 'react';
import type { Card } from '../types';

interface TrickPileProps {
  plays: { [id: string]: Card };
  leader: string;
}

/**
 * Shows cards that have been played this trick.
 * Renders small rotated cards in play order with leader highlighted.
 */
export function TrickPile({ plays, leader }: TrickPileProps) {
  const playEntries = Object.entries(plays);

  if (playEntries.length === 0) {
    return (
      <div className="flex h-24 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <span className="text-sm text-gray-500">No cards played</span>
      </div>
    );
  }

  const suitColorMap = {
    pink: 'ring-pink-500 border-pink-300',
    blue: 'ring-blue-500 border-blue-300',
    yellow: 'ring-yellow-500 border-yellow-300',
    green: 'ring-green-500 border-green-300',
    sub: 'ring-gray-500 border-gray-300',
  };

  return (
    <div className="relative flex h-24 w-32 items-center justify-center">
      {playEntries.map(([playerID, card], index) => {
        const isLeader = playerID === leader;
        const rotation = (index - playEntries.length / 2) * 15; // Spread cards in fan
        const offset = index * 8; // Slight horizontal offset

        return (
          <div
            key={playerID}
            className="absolute"
            style={{
              transform: `translateX(${offset}px) rotate(${rotation}deg)`,
              zIndex: index,
            }}
          >
            <div
              className={`flex h-16 w-10 items-center justify-center rounded border bg-white ring-1 ${
                suitColorMap[card.suit]
              } ${isLeader ? 'ring-4 ring-amber-400' : ''}`}
            >
              <span className="text-xs font-bold">{card.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
