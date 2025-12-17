import { ROUTES } from '@/const/routes';

export const enum TestType {
  Lesson = 'LESSON_TEST',
  Module = 'MODULE_EXAM',
}

export const constants = {
  title: {
    LESSON_TEST: 'TITLE_TEST.LESSON_TEST',
    MODULE_EXAM: 'TITLE_TEST.MODULE_EXAM',
  },
  description: {
    LESSON_TEST: 'DESCRIPTION.LESSON_TEST',
    MODULE_EXAM: 'DESCRIPTION.MODULE_EXAM',
  },
  questionAmount: 'QUESTIONS.AMOUNT',
  procent: 'QUESTIONS.MIN_PERCENT',
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
              label: 'BREADCRUMB_LABELS.MODULE_LABEL',
              number: moduleSequenceOrder,
              href: `${ROUTES.USER_MODULES}/${moduleId}`,
            },
            {
              label: 'BREADCRUMB_LABELS.LESSON_LABEL',
              number: lessonSequenceOrder + 1,
              href: `${ROUTES.USER_MODULES}/${moduleId}/${lessonId}`,
            },
            { label: 'TITLE_TEST.LESSON_TEST', href: '' },
          ]
        : [
            {
              label: 'BREADCRUMB_LABELS.MODULE_LABEL',
              number: moduleSequenceOrder,
              href: `${ROUTES.USER_EXAMS}`,
            },
          ];

    return items;
  },
};
