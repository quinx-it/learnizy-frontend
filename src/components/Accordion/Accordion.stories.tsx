import { type StoryType } from './typings';

import CardAccordion from '.';

import type { Meta } from '@storybook/nextjs';

const meta: Meta<typeof CardAccordion> = {
  title: 'Components/UI/CardAccordion',
  component: CardAccordion,
  tags: ['autodocs'],
  args: {
    items: [
      {
        value: 'item-1',
        heading: 'Как сохраняется мой прогресс?',
        content:
          'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
        bgColor: 'bg-blue-100',
        iconColor: 'text-cyan-700',
      },
      {
        value: 'item-2',
        heading: 'Как сохраняется мой прогресс?',
        content:
          'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
        bgColor: 'bg-violet-100',
        textColor: 'text-violet-600',
        iconColor: 'text-violet-600',
      },
      {
        value: 'item-3',
        heading: 'Как сохраняется мой прогресс?',
        content:
          'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
        bgColor: 'bg-yellow-100',
        iconColor: 'text-orange-500',
      },
    ],
  },
};
export default meta;

export const Default: StoryType = {};

export const WithCustomColors: StoryType = {
  args: {
    items: [
      {
        value: 'faq-1',
        heading: 'Как оплатить подписку?',
        content: 'Вы можете оплатить через банковскую карту, Apple Pay или Google Pay.',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        iconColor: 'text-green-600',
      },
      {
        value: 'faq-2',
        heading: 'Есть ли мобильное приложение?',
        content: 'Да, вы можете скачать его из App Store или Google Play.',
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-700',
        iconColor: 'text-pink-600',
      },
    ],
  },
};
