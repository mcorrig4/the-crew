import type { Meta, StoryObj } from '@storybook/react';
import { TrickPile } from './TrickPile';

const meta: Meta<typeof TrickPile> = {
  title: 'UI/TrickPile',
  component: TrickPile,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    plays: {},
    leader: '0',
  },
};

export const ThreePlays: Story = {
  args: {
    plays: {
      '0': { suit: 'blue', value: 7 },
      '1': { suit: 'pink', value: 3 },
      '2': { suit: 'blue', value: 9 },
    },
    leader: '0',
  },
};

export const FourPlays: Story = {
  args: {
    plays: {
      '0': { suit: 'green', value: 1 },
      '1': { suit: 'yellow', value: 5 },
      '2': { suit: 'green', value: 8 },
      '3': { suit: 'sub', value: 2 },
    },
    leader: '1',
  },
};

export const SinglePlay: Story = {
  args: {
    plays: {
      '2': { suit: 'pink', value: 4 },
    },
    leader: '2',
  },
};
