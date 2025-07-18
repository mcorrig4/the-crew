import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Hand } from './Hand';
import type { Card } from '../types/Card';

const meta: Meta<typeof Hand> = {
  title: 'UI/Hand',
  component: Hand,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample cards for stories
const sampleHand: Card[] = [
  { suit: 'green', value: 7 },
  { suit: 'pink', value: 3 },
  { suit: 'blue', value: 9 },
  { suit: 'yellow', value: 1 },
  { suit: 'sub', value: 2 },
  { suit: 'pink', value: 8 },
  { suit: 'green', value: 2 },
  { suit: 'blue', value: 5 },
  { suit: 'yellow', value: 6 },
  { suit: 'sub', value: 4 },
];

export const ActiveHand: Story = {
  args: {
    hand: sampleHand,
    onPlay: action('card-played'),
    isActive: true,
  },
};

export const InactiveHand: Story = {
  args: {
    hand: sampleHand,
    onPlay: action('card-played'),
    isActive: false,
  },
};
