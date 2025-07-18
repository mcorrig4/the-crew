import type { Meta, StoryObj } from '@storybook/react';
import CardBackCount from './CardBackCount';

const meta: Meta<typeof CardBackCount> = {
  title: 'UI/CardBackCount',
  component: CardBackCount,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    isCaptain: false,
  },
};

export const Remainder: Story = {
  args: {
    count: 14,
    isCaptain: false,
  },
};

export const Captain: Story = {
  args: {
    count: 10,
    isCaptain: true,
  },
};

export const CaptainWithRemainder: Story = {
  args: {
    count: 14,
    isCaptain: true,
  },
};
