import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './input';

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

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    error: 'Error',
    defaultValue: 'text',
  },
};

export const PasswordType: Story = {
  args: {
    type: 'password',
    placeholder: 'Введите пароль',
  },
};
