import type { Meta, StoryObj } from '@storybook/nextjs';
import { Textarea } from './textarea';

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

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Поле отключено',
    defaultValue: 'text',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Ошибка ввода',
    error: 'Error',
    defaultValue: 'text',
  },
};

export const WithCustomHeight: Story = {
  args: {
    style: {
      height: '150px',
    },
    placeholder: 'Многострочный текст...',
  },
};
