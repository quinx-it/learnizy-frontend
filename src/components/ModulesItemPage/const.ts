import { type TranslationFunctionType } from '@/types';

export const examAvailableNumber = 100;

export const createBreadcrumbs = (t: TranslationFunctionType) => (sequenceOrder?: number) => [
  {
    label: Number.isFinite(sequenceOrder)
      ? `${t('TEST_RESULT.MODULE')} ${sequenceOrder}`
      : t('TEST_RESULT.MODULE'),
    href: '',
  },
];
