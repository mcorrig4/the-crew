import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Hand } from '../Hand';
import type { Card } from '../../types/Card';

describe('Hand', () => {
  afterEach(() => {
    cleanup();
  });

  const sampleHand: Card[] = [
    { suit: 'green', value: 7 },
    { suit: 'pink', value: 3 },
    { suit: 'blue', value: 9 },
    { suit: 'yellow', value: 1 },
    { suit: 'sub', value: 2 },
  ];

  it('renders all cards in the hand', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={sampleHand} onPlay={mockOnPlay} isActive />);

    // Check that all card values are rendered (twice each due to Card component design)
    expect(screen.getAllByText('7')).toHaveLength(2);
    expect(screen.getAllByText('3')).toHaveLength(2);
    expect(screen.getAllByText('9')).toHaveLength(2);
    expect(screen.getAllByText('1')).toHaveLength(2);
    expect(screen.getAllByText('2')).toHaveLength(2);
  });

  it('sorts cards by suit then value', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={sampleHand} onPlay={mockOnPlay} isActive />);

    const buttons = screen.getAllByRole('button');

    // Verify the sorted order: pink(3), blue(9), yellow(1), green(7), sub(2)
    expect(buttons[0]).toHaveTextContent('3'); // pink 3
    expect(buttons[1]).toHaveTextContent('9'); // blue 9
    expect(buttons[2]).toHaveTextContent('1'); // yellow 1
    expect(buttons[3]).toHaveTextContent('7'); // green 7
    expect(buttons[4]).toHaveTextContent('2'); // sub 2
  });

  it('calls onPlay with original index when active card is clicked', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={sampleHand} onPlay={mockOnPlay} isActive />);

    // Click the first card in sorted order (pink 3, which was at index 1 in original)
    const firstCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstCard);

    expect(mockOnPlay).toHaveBeenCalledWith(1); // Original index of pink 3
  });

  it('does not call onPlay when inactive card is clicked', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={sampleHand} onPlay={mockOnPlay} isActive={false} />);

    const firstCard = screen.getAllByRole('button')[0];
    fireEvent.click(firstCard);

    expect(mockOnPlay).not.toHaveBeenCalled();
  });

  it('applies correct styles for active hand', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={sampleHand} onPlay={mockOnPlay} isActive />);

    const firstCard = screen.getAllByRole('button')[0];
    expect(firstCard).toHaveClass('hover:scale-105');
    expect(firstCard).not.toBeDisabled();
  });

  it('applies correct styles for inactive hand', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={sampleHand} onPlay={mockOnPlay} isActive={false} />);

    const firstCard = screen.getAllByRole('button')[0];
    expect(firstCard).toHaveClass('cursor-not-allowed');
    expect(firstCard).toHaveClass('opacity-75');
    expect(firstCard).toBeDisabled();
  });

  it('handles empty hand gracefully', () => {
    const mockOnPlay = vi.fn();
    render(<Hand hand={[]} onPlay={mockOnPlay} isActive />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  describe('boardgame.io integration', () => {
    it('triggers moves.playCard only when active', () => {
      const mockPlayCard = vi.fn();

      // Render with active state
      const { rerender } = render(<Hand hand={sampleHand} onPlay={mockPlayCard} isActive />);

      // Click the first card when active
      const firstCard = screen.getAllByRole('button')[0];
      fireEvent.click(firstCard);

      expect(mockPlayCard).toHaveBeenCalledWith(1); // Original index of pink 3
      expect(mockPlayCard).toHaveBeenCalledTimes(1);

      // Reset mock
      mockPlayCard.mockClear();

      // Re-render with inactive state
      rerender(<Hand hand={sampleHand} onPlay={mockPlayCard} isActive={false} />);

      // Click the first card when inactive
      const inactiveCard = screen.getAllByRole('button')[0];
      fireEvent.click(inactiveCard);

      expect(mockPlayCard).not.toHaveBeenCalled();
    });
  });
});
