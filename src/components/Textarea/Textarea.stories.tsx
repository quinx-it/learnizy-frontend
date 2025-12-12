import { type StoryType } from './typings';

import Textarea from '.';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof Textarea> = {
  title: 'Components/UI/Textarea',
  component: Textarea,
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
    placeholder: 'Поле отключено',
    defaultValue: 'text',
  },
};

export const Invalid: StoryType = {
  args: {
    'aria-invalid': true,
    placeholder: 'Ошибка ввода',
    error: 'Error',
    defaultValue: 'text',
  },
};

export const WithCustomHeight: StoryType = {
  args: {
    style: {
      height: '150px',
    },
    placeholder: 'Многострочный текст...',
  },
};
