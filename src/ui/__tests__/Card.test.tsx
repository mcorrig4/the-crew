import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from '../Card';
import type { Card as CardType } from '../../types';

describe('Card', () => {
  const mockCard: CardType = {
    suit: 'pink',
    value: 5,
  };

  it('renders card with correct value displayed twice', () => {
    render(<Card card={mockCard} />);

    const valueElements = screen.getAllByText('5');
    expect(valueElements).toHaveLength(2);
  });

  it('applies correct background color for each suit', () => {
    const suits: CardType['suit'][] = ['pink', 'blue', 'yellow', 'green', 'sub'];
    const expectedBgClasses = [
      'bg-pink-100',
      'bg-blue-100',
      'bg-yellow-100',
      'bg-green-100',
      'bg-gray-100',
    ];

    suits.forEach((suit, index) => {
      const { container } = render(<Card card={{ suit, value: 1 }} />);
      const cardElement = container.firstChild as HTMLElement;

      expect(cardElement).toHaveClass(expectedBgClasses[index]);
    });
  });

  it('applies correct text color for each suit', () => {
    const suits: CardType['suit'][] = ['pink', 'blue', 'yellow', 'green', 'sub'];
    const expectedTextClasses = [
      'text-pink-800',
      'text-blue-800',
      'text-yellow-800',
      'text-green-800',
      'text-gray-800',
    ];

    suits.forEach((suit, index) => {
      const { container } = render(<Card card={{ suit, value: 1 }} />);
      const valueElements = container.querySelectorAll('[class*="text-"]');

      valueElements.forEach((element) => {
        expect(element).toHaveClass(expectedTextClasses[index]);
      });
    });
  });

  it('applies selectable styles when selectable is true', () => {
    const { container } = render(<Card card={mockCard} selectable />);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('border-blue-500', 'ring-2', 'ring-blue-200', 'cursor-pointer');
  });

  it('applies disabled styles when disabled is true', () => {
    const { container } = render(<Card card={mockCard} disabled />);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('border-gray-300', 'opacity-50');
  });

  it('applies normal border when neither selectable nor disabled', () => {
    const { container } = render(<Card card={mockCard} />);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('border-gray-200');
    expect(cardElement).not.toHaveClass(
      'border-blue-500',
      'border-gray-300',
      'opacity-50',
      'cursor-pointer',
    );
  });

  it('disabled state takes precedence over selectable', () => {
    const { container } = render(<Card card={mockCard} selectable disabled />);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('border-gray-300', 'opacity-50');
    expect(cardElement).not.toHaveClass('border-blue-500', 'cursor-pointer');
  });

  it('renders with correct card dimensions', () => {
    const { container } = render(<Card card={mockCard} />);
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement).toHaveClass('h-24', 'w-16', 'rounded-lg');
  });
});
