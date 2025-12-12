import { routes } from '@/const';
import { type TranslationFunctionType } from '@/types';

export const createBreadcrumbs =
  (t: TranslationFunctionType) =>
  (moduleSequenceOrder: number, moduleId: string, lessonId: string, sequenceOrder: number) => [
    {
      label: `${t('TEST_RESULT.MODULE')} ${moduleSequenceOrder}`,
      href: `${routes.user.modules}/${moduleId}`,
    },
    {
      label: `${t('TEST_RESULT.LESSON')} ${sequenceOrder}`,
      href: `${routes.user.modules}/${moduleId}/${lessonId}`,
    },
    { label: t('LESSON_RETELLING.ASK_QUESTION'), href: '' },
  ];
