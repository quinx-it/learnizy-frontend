import { PasswordInput } from './passwordInput';
import { StoryType } from './typings';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Введите пароль',
  },
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;

export const Default: StoryType = {};

export const Disabled: StoryType = {
  args: {
    value: 'неактивный',
    disabled: true,
  },
};
