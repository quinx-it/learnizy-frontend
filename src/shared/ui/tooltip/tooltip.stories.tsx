import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { CustomTooltip } from './tooltip'

const meta: Meta<typeof CustomTooltip> = {
  title: 'Components/UI/CustomTooltip',
  component: CustomTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof CustomTooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button className="px-4 py-2 bg-gray-200 rounded">Hover me</button>,
  },
}

export const WithOffset: Story = {
  args: {
    content: 'Offset: 10px (side: right)',
    offset: 10,
    side: 'right',
    children: <button className="px-4 py-2 bg-gray-200 rounded">Hover with offset</button>,
  },
}

export const WithDelay: Story = {
  args: {
    content: 'Appears with delay (500ms)',
    delay: 500,
    children: <button className="px-4 py-2 bg-gray-200 rounded">Hover with delay</button>,
  },
}

export const PositionedBottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <button className="px-4 py-2 bg-gray-200 rounded">Hover (bottom)</button>,
  },
}

export const CustomContent: Story = {
  args: {
    content: (
      <span>
        <strong>Bold</strong> tooltip text
      </span>
    ),
    children: <span className="underline cursor-help">Hover for info</span>,
  },
}