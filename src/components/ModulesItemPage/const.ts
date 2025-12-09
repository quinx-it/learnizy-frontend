import { TranslationFunctionType } from '@/types';

export const examAvailableNumber = 100;

export const createBreadcrumbs = (t: TranslationFunctionType) => (sequenceNumber: number) => [
  { label: `${t('TEST_RESULT.MODULE')} ${sequenceNumber}`, href: '' },
];
