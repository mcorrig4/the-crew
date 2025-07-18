import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Examples: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card suit="pink" value={5} />
      <Card suit="blue" value={5} />
      <Card suit="yellow" value={5} />
      <Card suit="green" value={5} />
      <Card suit="sub" value={5} />
    </div>
  ),
};
