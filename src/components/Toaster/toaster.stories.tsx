'use client';

import { Meta, StoryFn } from '@storybook/nextjs';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import { Toaster, showToast } from '.';

const Demo = () => {
  return (
    <div className="flex w-[300px] flex-col">
      <button
        type="button"
        onClick={() => showToast('success', 'Успешно!', 'Кастомный тост работает')}
        style={{
          padding: '8px 16px',
          marginBottom: 20,
          cursor: 'pointer',
          backgroundColor: 'var(--success)',
          color: 'var(--black)',
          border: 'none',
          borderRadius: 6,
        }}
      >
        Успех
      </button>

      <button
        type="button"
        onClick={() => showToast('warning', 'Предупреждение!', 'Кастомный тост работает')}
        style={{
          padding: '8px 16px',
          marginBottom: 20,
          cursor: 'pointer',
          backgroundColor: 'var(--warning)',
          color: 'var(--black)',
          border: 'none',
          borderRadius: 6,
        }}
      >
        Предупреждение
      </button>

      <button
        type="button"
        onClick={() => showToast('error', 'Ошибка!', 'Кастомный тост работает')}
        style={{
          padding: '8px 16px',
          marginBottom: 20,
          cursor: 'pointer',
          backgroundColor: 'var(--error)',
          color: 'var(--black)',
          border: 'none',
          borderRadius: 6,
        }}
      >
        Ошибка
      </button>

      <button
        type="button"
        onClick={() => showToast('info', 'Информация!', 'Кастомный тост работает')}
        style={{
          padding: '8px 16px',
          marginBottom: 20,
          cursor: 'pointer',
          backgroundColor: 'var(--soft)',
          color: 'var(--medium)',
          border: 'none',
          borderRadius: 6,
        }}
      >
        Информация
      </button>
      <Toaster />
    </div>
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
