'use client';

import type { Meta } from '@storybook/nextjs';
import { Input } from './input';
import { StoryType } from './typings';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'text',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#393e45ff', padding: '20px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryType = {};

export const Disabled: StoryType = {
  args: {
    disabled: true,
  },
};

export const Invalid: StoryType = {
  args: {
    'aria-invalid': true,
    error: 'Error',
    defaultValue: 'text',
  },
};
