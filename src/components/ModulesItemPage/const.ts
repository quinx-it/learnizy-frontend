import { type TranslationFunctionType } from '@/types';

export const examAvailableNumber = 100;

export const createBreadcrumbs = (t: TranslationFunctionType) => (sequenceNumber?: number) => [
  {
    label: Number.isFinite(sequenceNumber)
      ? `${t('TEST_RESULT.MODULE')} ${sequenceNumber}`
      : t('TEST_RESULT.MODULE'),
    href: '',
  },
];
