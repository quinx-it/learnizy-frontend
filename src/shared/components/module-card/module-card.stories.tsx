import type { Meta, StoryObj } from '@storybook/nextjs';
import { ModuleCard } from './module-card';
import { completedModule, inProgressModule, lockedModule, newModule } from './constants';

const meta: Meta<typeof ModuleCard> = {
  title: 'Components/ModuleCard',
  component: ModuleCard,
  tags: ['autodocs'],
  args: completedModule,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#F2FCFF',
          padding: '20px',
          borderRadius: '8px',
          width: '600px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Completed: Story = {
  args: completedModule,
};
export const Active: Story = {
  args: inProgressModule,
};
export const Blocked: Story = {
  args: lockedModule,
};
export const Bonus: Story = {
  args: newModule,
};
