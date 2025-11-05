import React from 'react';

import { CustomTooltip } from './tooltip';
import { StoryType } from './typings';

import type { Meta } from '@storybook/nextjs';

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
};

export default meta;

export const Default: StoryType = {
  args: {
    content: 'This is a tooltip',
    children: <button className="rounded bg-gray-200 px-4 py-2">Hover me</button>,
  },
};

export const WithOffset: StoryType = {
  args: {
    content: 'Offset: 10px (side: right)',
    offset: 10,
    side: 'right',
    children: <button className="rounded bg-gray-200 px-4 py-2">Hover with offset</button>,
  },
};

export const WithDelay: StoryType = {
  args: {
    content: 'Appears with delay (500ms)',
    delay: 500,
    children: <button className="rounded bg-gray-200 px-4 py-2">Hover with delay</button>,
  },
};

export const PositionedBottom: StoryType = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <button className="rounded bg-gray-200 px-4 py-2">Hover (bottom)</button>,
  },
};

export const CustomContent: StoryType = {
  args: {
    content: (
      <span>
        <strong>Bold</strong> tooltip text
      </span>
    ),
    children: <span className="cursor-help underline">Hover for info</span>,
  },
};
