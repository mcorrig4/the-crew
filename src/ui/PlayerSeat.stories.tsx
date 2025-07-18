import type { Meta, StoryObj } from '@storybook/react';
import { PlayerSeat } from './PlayerSeat';

const meta: Meta<typeof PlayerSeat> = {
  title: 'UI/PlayerSeat',
  component: PlayerSeat,
  parameters: {
    layout: 'centered',
  },
  args: {
    seat: 1,
    isCurrent: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    seat: 1,
    isCurrent: false,
  },
};

export const Current: Story = {
  args: {
    seat: 1,
    isCurrent: true,
  },
};

export const WithCards: Story = {
  args: {
    seat: 2,
    isCurrent: false,
    cardCount: 10,
    isCaptain: false,
  },
};

export const Captain: Story = {
  args: {
    seat: 3,
    isCurrent: false,
    cardCount: 10,
    isCaptain: true,
  },
};
