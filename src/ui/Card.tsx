import React from 'react';
import type { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  selectable?: boolean;
  disabled?: boolean;
}

export function Card({ card, selectable = false, disabled = false }: CardProps) {
  const { suit, value } = card;

  const suitBackgroundMap = {
    pink: 'bg-pink-100',
    blue: 'bg-blue-100',
    yellow: 'bg-yellow-100',
    green: 'bg-green-100',
    sub: 'bg-gray-100',
  };

  const suitTextColorMap = {
    pink: 'text-pink-800',
    blue: 'text-blue-800',
    yellow: 'text-yellow-800',
    green: 'text-green-800',
    sub: 'text-gray-800',
  };

  const getBorderClass = () => {
    if (disabled) {
      return 'border-2 border-gray-300 opacity-50';
    }
    if (selectable) {
      return 'border-2 border-blue-500 ring-2 ring-blue-200 cursor-pointer hover:ring-blue-300';
    }
    return 'border-2 border-gray-200';
  };

  return (
    <div className={`relative h-24 w-16 rounded-lg ${suitBackgroundMap[suit]} ${getBorderClass()}`}>
      {/* Top-left value */}
      <div className={`absolute left-1 top-1 text-sm font-bold ${suitTextColorMap[suit]}`}>
        {value}
      </div>

      {/* Bottom-right value (rotated) */}
      <div
        className={`absolute bottom-1 right-1 rotate-180 text-sm font-bold ${suitTextColorMap[suit]}`}
      >
        {value}
      </div>
    </div>
  );
}
