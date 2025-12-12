import * as yup from 'yup';

import { type TranslationFunctionType } from '@/types';

export const createFormSchema = (t: TranslationFunctionType) =>
  yup.object().shape({
    username: yup
      .string()
      .required(t('VALIDATION.REQUIRED_EMAIL_OR_USERNAME'))
      .test('is-email-or-username', t('VALIDATION.INVALID_EMAIL_USERNAME'), (value) => {
        if (!value) return false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9._-]{3,50}$/;

        return emailRegex.test(value) || usernameRegex.test(value);
      }),
    password: yup
      .string()
      .min(6, t('VALIDATION.MIN_6_CHARS'))
      .max(100, t('VALIDATION.MAX_100_CHARS'))
      .required(t('VALIDATION.REQUIRED_PASSWORD_AUTH')),
  });
