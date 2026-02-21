import { ROUTES } from '@/const/routes';
import { type TranslationFunctionType } from '@/types';

const getModulesBase = (courseId?: number) =>
  courseId != null ? `${ROUTES.USER_COURSES}/${courseId}/modules` : ROUTES.USER_MODULES;

export const createBreadcrumbs =
  (t: TranslationFunctionType, courseId?: number) =>
  (moduleSequenceOrder: number, moduleId: string, lessonId: string, sequenceOrder: number) => {
    const base = getModulesBase(courseId);

    return [
      { label: `${t('TEST_RESULT.MODULE')} ${moduleSequenceOrder}`, href: `${base}/${moduleId}` },
      {
        label: `${t('TEST_RESULT.LESSON')} ${sequenceOrder}`,
        href: `${base}/${moduleId}/${lessonId}`,
      },
      { label: t('LESSON_RETELLING.ASK_QUESTION'), href: '' },
    ];
  };
