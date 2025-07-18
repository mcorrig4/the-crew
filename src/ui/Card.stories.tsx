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
      <Card card={{ suit: 'pink', value: 5 }} />
      <Card card={{ suit: 'blue', value: 7 }} />
      <Card card={{ suit: 'yellow', value: 3 }} />
      <Card card={{ suit: 'green', value: 9 }} />
      <Card card={{ suit: 'sub', value: 2 }} />
    </div>
  ),
};

export const Selectable: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card card={{ suit: 'pink', value: 5 }} selectable />
      <Card card={{ suit: 'blue', value: 7 }} selectable />
      <Card card={{ suit: 'yellow', value: 3 }} selectable />
      <Card card={{ suit: 'green', value: 9 }} selectable />
      <Card card={{ suit: 'sub', value: 2 }} selectable />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card card={{ suit: 'pink', value: 5 }} disabled />
      <Card card={{ suit: 'blue', value: 7 }} disabled />
      <Card card={{ suit: 'yellow', value: 3 }} disabled />
      <Card card={{ suit: 'green', value: 9 }} disabled />
      <Card card={{ suit: 'sub', value: 2 }} disabled />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-semibold">Normal</div>
      <div className="flex gap-2">
        <Card card={{ suit: 'pink', value: 1 }} />
        <Card card={{ suit: 'blue', value: 5 }} />
        <Card card={{ suit: 'yellow', value: 9 }} />
      </div>

      <div className="text-sm font-semibold">Selectable</div>
      <div className="flex gap-2">
        <Card card={{ suit: 'pink', value: 1 }} selectable />
        <Card card={{ suit: 'blue', value: 5 }} selectable />
        <Card card={{ suit: 'yellow', value: 9 }} selectable />
      </div>

      <div className="text-sm font-semibold">Disabled</div>
      <div className="flex gap-2">
        <Card card={{ suit: 'pink', value: 1 }} disabled />
        <Card card={{ suit: 'blue', value: 5 }} disabled />
        <Card card={{ suit: 'yellow', value: 9 }} disabled />
      </div>
    </div>
  ),
};
