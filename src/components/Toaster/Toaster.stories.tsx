'use client';

import { type Meta, type StoryFn } from '@storybook/nextjs';
import { ThemeProvider } from 'next-themes';

import { Toaster, showToast } from '.';

import { StoryContainer, StoryButton } from './styles';

const Demo = () => {
  return (
    <StoryContainer>
      <StoryButton
        type="button"
        onClick={() => showToast('success', 'Успешно!', 'Кастомный тост работает')}
        $bg="var(--success)"
        $color="var(--black)"
      >
        Успех
      </StoryButton>

      <StoryButton
        type="button"
        onClick={() => showToast('warning', 'Предупреждение!', 'Кастомный тост работает')}
        $bg="var(--warning)"
        $color="var(--black)"
      >
        Предупреждение
      </StoryButton>

      <StoryButton
        type="button"
        onClick={() => showToast('error', 'Ошибка!', 'Кастомный тост работает')}
        $bg="var(--error)"
        $color="var(--black)"
      >
        Ошибка
      </StoryButton>

      <StoryButton
        type="button"
        onClick={() => showToast('info', 'Информация!', 'Кастомный тост работает')}
        $bg="var(--soft)"
        $color="var(--medium)"
      >
        Информация
      </StoryButton>
      <Toaster />
    </StoryContainer>
  );
};

export default {
  title: 'Components/UI/Notification',
  component: Demo,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div style={{ padding: 20 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <Demo />;

export const Default = Template.bind({});
