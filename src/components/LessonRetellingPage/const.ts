import { ROUTES } from '@/const/routes';
import { type TranslationFunctionType } from '@/types';

export const createBreadcrumbs =
  (t: TranslationFunctionType) =>
  (moduleSequenceOrder: number, moduleId: string, lessonId: string, sequenceOrder: number) => [
    {
      label: `${t('TEST_RESULT.MODULE')} ${moduleSequenceOrder}`,
      href: `${ROUTES.user.modules}/${moduleId}`,
    },
    {
      label: `${t('TEST_RESULT.LESSON')} ${sequenceOrder}`,
      href: `${ROUTES.user.modules}/${moduleId}/${lessonId}`,
    },
    { label: t('LESSON_RETELLING.ASK_QUESTION'), href: '' },
  ];
