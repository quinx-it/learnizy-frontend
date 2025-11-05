import { Calendar } from './calendar';
import { StoryType } from './typings';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof Calendar> = {
  title: 'Components/UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
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

export const Default: StoryType = {
  args: {
    mode: 'single',
    selected: new Date(),
  },
};

export const WithRangeSelection: StoryType = {
  args: {
    mode: 'range',
    selected: {
      from: new Date(2025, 6, 10),
      to: new Date(2025, 6, 15),
    },
  },
};

export const WithCaptionDropdowns: StoryType = {
  args: {
    mode: 'single',
    selected: new Date(),
    captionLayout: 'dropdown',
  },
};

export const WithWeekNumbers: StoryType = {
  args: {
    mode: 'single',
    showWeekNumber: true,
  },
};
