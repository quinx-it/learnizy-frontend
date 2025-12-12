import * as yup from 'yup';

import { type TranslationFunctionType } from '@/types';

export const createFormSchema = (t: TranslationFunctionType) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('VALIDATION.REQUIRED_EMAIL'))
      .email(t('VALIDATION.INVALID_EMAIL')),
  });
