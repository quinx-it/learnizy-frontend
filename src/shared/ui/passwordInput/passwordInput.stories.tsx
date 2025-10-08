import type { Meta, StoryObj } from '@storybook/nextjs';
import { PasswordInput } from './passwordInput';

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

type StoryType = StoryObj<typeof PasswordInput>;

export const Default: StoryType = {};

export const Disabled: StoryType = {
  args: {
    value: 'неактивный',
    disabled: true,
  },
};
