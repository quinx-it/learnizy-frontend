import type { Meta } from '@storybook/nextjs';
import { useState } from 'react';
import { CustomSelect } from './select';
import { StoryType } from './typings';

const meta: Meta<typeof CustomSelect> = {
  title: 'Components/UI/CustomSelect',
  component: CustomSelect,
  tags: ['autodocs'],
};

export default meta;

const options = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' },
  { label: 'Option 5', value: 'opt5' },
  { label: 'Option 6', value: 'opt6' },
  { label: 'Option 7', value: 'opt7' },
  { label: 'Option 8', value: 'opt8' },
  { label: 'Option 9', value: 'opt9' },
  { label: 'Option 10', value: 'opt10' },
  { label: 'Option 11', value: 'opt11' },
  { label: 'Option 12', value: 'opt12' },
];

export const Default: StoryType = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <CustomSelect
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder="Select an option"
      />
    );
  },
};
