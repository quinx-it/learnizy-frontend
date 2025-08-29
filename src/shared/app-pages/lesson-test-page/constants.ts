import { globalConstants, routes } from '@/shared/constants';

const { moduleLabel, lessonLabel } = globalConstants.rootBreadcrumbLabels;

export const constants = {
  title: 'Тест по уроку',
  description:
    'Пройдите короткий тест, чтобы закрепить материал и проверить понимание темы.\nНе спешите — внимательно читайте вопросы, ведь именно сейчас вы закрепляете знания,которые пригодятся на собеседовании.',
  questionAmount: ' 📋 Количество вопросов: ',
  procent: '🎯 Минимальный процент для прохождения:',
  breadcrumbs: (moduleSequenceOrder: number, lessonSequenceOrder: number) => [
    { label: `${moduleLabel} ${moduleSequenceOrder}`, href: `${routes.user.modules}/${moduleSequenceOrder}` },
    {
      label: `${lessonLabel} ${lessonSequenceOrder}`,
      href: `${routes.user.modules}/${moduleSequenceOrder}/${lessonSequenceOrder}`,
    },
    { label: `Тест по уроку`, href: '' },
  ],
};