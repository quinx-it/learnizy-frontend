import { ROUTES } from '@/const/routes';
import { type TranslationFunctionType } from '@/types';

export const createBreadcrumbs =
  (t: TranslationFunctionType) =>
  (moduleSequenceOrder: number, moduleId: string, lessonId: string, sequenceOrder: number) => [
    {
      label: `${t('TEST_RESULT.MODULE')} ${moduleSequenceOrder}`,
      href: `${ROUTES.USER_MODULES}/${moduleId}`,
    },
    {
      label: `${t('TEST_RESULT.LESSON')} ${sequenceOrder}`,
      href: `${ROUTES.USER_MODULES}/${moduleId}/${lessonId}`,
    },
    { label: t('LESSON_RETELLING.ASK_QUESTION'), href: '' },
  ];
