'use client';

import type { Meta } from '@storybook/nextjs';
import { Checkbox } from './Checkbox';
import { Label } from '@radix-ui/react-label';
import { StoryType } from './typings';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#393e45ff', padding: '20px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryType = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="checkbox-default" />
      <Label htmlFor="checkbox-default">Default Checkbox</Label>
    </div>
  ),
};

export const Checked: StoryType = {
  args: {
    checked: true,
  },
};

export const Disabled: StoryType = {
  args: {
    disabled: true,
  },
};

export const CheckedDisabled: StoryType = {
  args: {
    checked: true,
    disabled: true,
  },
};
