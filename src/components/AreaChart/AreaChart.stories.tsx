import { type StoryType } from './typings';

import AreaChart from '.';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof AreaChart> = {
  title: 'Components/UI/LineChart',
  component: AreaChart,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ffffffff', padding: '20px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryType = {};

export const WithCustomData: StoryType = {
  render: () => {
    const customData = [
      { day: 'пн', value: 150 },
      { day: 'вт', value: 220 },
      { day: 'ср', value: 180 },
      { day: 'чт', value: 240 },
      { day: 'пт', value: 300 },
    ];

    return (
      <div style={{ width: '100%', maxWidth: '512px' }}>
        <AreaChart data={customData} />
      </div>
    );
  },
};
