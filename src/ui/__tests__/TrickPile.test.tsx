import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TrickPile } from '../TrickPile';

describe('TrickPile', () => {
  it('renders empty state when no cards are played', () => {
    render(<TrickPile plays={{}} leader="0" />);
    expect(screen.getByText('No cards played')).toBeInTheDocument();
  });

  it('renders a single card with leader highlight', () => {
    const plays = {
      '0': { suit: 'blue' as const, value: 7 },
    };
    render(<TrickPile plays={plays} leader="0" />);

    const card = screen.getByText('7');
    expect(card).toBeInTheDocument();

    // Check that leader has amber ring (using class check)
    const cardContainer = card.closest('div');
    expect(cardContainer).toHaveClass('ring-amber-400');
  });

  it('renders multiple cards without leader highlight for non-leader', () => {
    const plays = {
      '0': { suit: 'blue' as const, value: 7 },
      '1': { suit: 'pink' as const, value: 3 },
      '2': { suit: 'green' as const, value: 9 },
    };
    render(<TrickPile plays={plays} leader="1" />);

    // All cards should be rendered
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();

    // Only the leader card should have amber ring
    const leaderCard = screen.getByText('3').closest('div');
    const nonLeaderCard1 = screen.getByText('7').closest('div');
    const nonLeaderCard2 = screen.getByText('9').closest('div');

    expect(leaderCard).toHaveClass('ring-amber-400');
    expect(nonLeaderCard1).not.toHaveClass('ring-amber-400');
    expect(nonLeaderCard2).not.toHaveClass('ring-amber-400');
  });

  it('applies correct suit colors', () => {
    const plays = {
      '0': { suit: 'pink' as const, value: 1 },
      '1': { suit: 'sub' as const, value: 2 },
    };
    render(<TrickPile plays={plays} leader="0" />);

    const pinkCard = screen.getByText('1').closest('div');
    const subCard = screen.getByText('2').closest('div');

    expect(pinkCard).toHaveClass('ring-pink-500');
    expect(subCard).toHaveClass('ring-gray-500');
  });
});
