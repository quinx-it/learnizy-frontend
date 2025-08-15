import { routes } from '@/shared/constants';
import { globalConstants } from '@/shared/constants/constants';

export const constants = {
  breadCrumbs: [
    { label: globalConstants.rootBreadcrumbLabels.faqLabel, href: routes.frequentlyAskedQuestions },
  ],
  accordionItems: [
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
    {
      value: 'item-4',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-blue-100',
      iconColor: 'text-cyan-700',
    },
    {
      value: 'item-5',
      heading: 'Как сохраняется мой прогресс?',
      content:
        'Прогресс сохраняется автоматически. Вы можете выйти в любой момент и вернуться — система запомнит, где вы остановились.',
      bgColor: 'bg-violet-100',
      textColor: 'text-violet-600',
      iconColor: 'text-violet-600',
    },
  ],
};
