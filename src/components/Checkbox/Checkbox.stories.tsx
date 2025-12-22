'use client';

import { Label } from '@radix-ui/react-label';

import { type StoryType } from './typings';

import Checkbox from '.';

import { Row } from './styles';

import type { Meta } from '@storybook/nextjs';

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
    <Row>
      <Checkbox {...args} id="checkbox-default" />
      <Label htmlFor="checkbox-default">Default Checkbox</Label>
    </Row>
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
