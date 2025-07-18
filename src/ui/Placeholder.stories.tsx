import type { Meta, StoryObj } from '@storybook/react'
import { Placeholder } from './Placeholder'

const meta = {
  title: 'UI/Placeholder',
  component: Placeholder,
} satisfies Meta<typeof Placeholder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}