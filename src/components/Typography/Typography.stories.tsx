import { HeadingStoryType, TextStoryType } from './typings';

import { Heading, Text } from '.';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof Heading> = {
  title: 'Components/UI/Typography',
  component: Heading,
  tags: ['autodocs'],
};

export default meta;

export const AllHeadingVariants: HeadingStoryType = {
  render: () => (
    <div className="space-y-4">
      {(
        [
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl',
          '7xl',
          'xl-bold',
          '2xl-bold',
          '3xl-bold',
          '4xl-bold',
          '5xl-bold',
          '6xl-bold',
          '7xl-bold',
        ] as const
      ).map((variant) => (
        <Heading key={variant} variant={variant}>
          {variant}
        </Heading>
      ))}
    </div>
  ),
};

export const AllTextVariants: TextStoryType = {
  render: () => (
    <div className="space-y-2">
      {(['s', 's-bold', 'm', 'm-bold', 'l', 'l-bold'] as const).map((variant) => (
        <Text key={variant} variant={variant}>
          {variant} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

export const CustomTags: HeadingStoryType = {
  render: () => (
    <div className="space-y-3">
      <Heading tag="h1" variant="4xl">
        h1 tag, 4xl variant
      </Heading>
      <Heading tag="h2" variant="3xl-bold">
        h2 tag, 3xl-bold variant
      </Heading>
      <Text tag="span" variant="m-bold">
        span tag, m-bold variant
      </Text>
    </div>
  ),
};
