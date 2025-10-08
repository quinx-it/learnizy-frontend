import type { Meta, StoryObj } from '@storybook/nextjs';
import { Breadcrumbs } from './breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/UI/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    rootLabel: { control: 'text' },
    rootHref: { control: 'text' },
    rootDescription: { control: 'text' },
    items: { control: 'object' },
  },
};

export default meta;
type StoryType = StoryObj<typeof Breadcrumbs>;

export const Default: StoryType = {
  args: {
    rootLabel: 'Главная',
    rootHref: '/',
    items: [
      { label: 'Каталог', href: '/catalog' },
      { label: 'Электроника', href: '/catalog/electronics' },
      { label: 'Смартфоны', href: '/catalog/electronics/smartphones' },
    ],
  },
};

export const OnlyRoot: StoryType = {
  args: {
    rootLabel: 'Главная',
    rootHref: '/',
    rootDescription: 'Описание страницы',
  },
};

export const CustomRoot: StoryType = {
  args: {
    rootLabel: 'Home',
    rootHref: '/home',
    items: [
      { label: 'Library', href: '/home/library' },
      { label: 'Books', href: '/home/library/books' },
    ],
  },
};
