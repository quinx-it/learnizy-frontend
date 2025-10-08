import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePicker } from './datePicker';

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

type StoryType = StoryObj<typeof DatePicker>;

export const Default: StoryType = {};
