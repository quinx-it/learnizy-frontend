// src/shared/ui/checkbox/Checkbox.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './checkbox';
import { Label } from '@radix-ui/react-label';

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

type StoryType = StoryObj<typeof Checkbox>;

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
