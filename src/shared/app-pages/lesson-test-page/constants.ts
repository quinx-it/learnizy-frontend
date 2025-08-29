import { globalConstants, routes } from '@/shared/constants';

const { moduleLabel, lessonLabel } = globalConstants.rootBreadcrumbLabels;

export const constants = {
  title: 'Тест по уроку',
  description:
    'Пройдите короткий тест, чтобы закрепить материал и проверить понимание темы.\nНе спешите — внимательно читайте вопросы, ведь именно сейчас вы закрепляете знания,которые пригодятся на собеседовании.',
  questionAmount: ' 📋 Количество вопросов: ',
  procent: '🎯 Минимальный процент для прохождения:',
  breadcrumbs: (moduleId: string, lessonId: string) => [
    { label: `${moduleLabel} ${moduleId}`, href: `${routes.user.modules}/${moduleId}` },
    {
      label: `${lessonLabel} ${lessonId}`,
      href: `${routes.user.modules}/${moduleId}/${lessonId}`,
    },
    { label: `Тест по уроку`, href: '' },
  ],
};
