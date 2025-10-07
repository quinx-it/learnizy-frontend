import { globalConstants, routes } from '@/shared/constants';

const { moduleLabel, lessonLabel } = globalConstants.rootBreadcrumbLabels;

export const constants = {
  title: {
    LESSON_TEST: 'Тест по уроку',
    MODULE_EXAM: 'Экзамен по модулю',
  },
  description: {
    LESSON_TEST:
      'Пройдите короткий тест, чтобы закрепить материал и проверить понимание темы.\nНе спешите — внимательно читайте вопросы, ведь именно сейчас вы закрепляете знания,которые пригодятся на собеседовании.',
    MODULE_EXAM:
      'Пройдите экзамен, чтобы проверить знания по всему модулю и оценить свой прогресс.',
  },
  questionAmount: '📋 Количество вопросов: ',
  procent: '🎯 Минимальный процент для прохождения: ',
  breadcrumbs: (
    moduleId: string,
    lessonId: string,
    testType: string,
    lessonSequenceOrder: number,
    moduleSequenceOrder: number,
  ) => {
    const items =
      testType === 'LESSON_TEST'
        ? [
            {
              label: `${moduleLabel} ${moduleSequenceOrder}`,
              href: `${routes.user.modules}/${moduleId}`,
            },
            {
              label: `${lessonLabel} ${lessonSequenceOrder + 1}`,
              href: `${routes.user.modules}/${moduleId}/${lessonId}`,
            },
            { label: 'Тест по уроку', href: '' },
          ]
        : [{ label: `${moduleLabel} ${moduleSequenceOrder}`, href: `${routes.user.exams}` }];
    return items;
  },
};
