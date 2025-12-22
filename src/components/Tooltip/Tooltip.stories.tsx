import { type StoryType } from './typings';

import CustomTooltip from '.';

import { HelpText, StoryButton } from './styles';

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
    children: <StoryButton type="button">Hover me</StoryButton>,
  },
};

export const WithOffset: StoryType = {
  args: {
    content: 'Offset: 10px (side: right)',
    offset: 10,
    side: 'right',
    children: <StoryButton type="button">Hover with offset</StoryButton>,
  },
};

export const WithDelay: StoryType = {
  args: {
    content: 'Appears with delay (500ms)',
    delay: 500,
    children: <StoryButton type="button">Hover with delay</StoryButton>,
  },
};

export const PositionedBottom: StoryType = {
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <StoryButton type="button">Hover (bottom)</StoryButton>,
  },
};

export const CustomContent: StoryType = {
  args: {
    content: (
      <span>
        <strong>Bold</strong> tooltip text
      </span>
    ),
    children: <HelpText>Hover for info</HelpText>,
  },
};
