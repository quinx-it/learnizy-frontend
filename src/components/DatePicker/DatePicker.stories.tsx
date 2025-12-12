'use client';

import { type StoryType } from './typings';

import DatePicker from '.';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#393e45ff',
          padding: '20px',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryType = {};
