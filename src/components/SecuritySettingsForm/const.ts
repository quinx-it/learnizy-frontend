import * as yup from 'yup';

import { type TranslationFunctionType } from '@/types';

export const createSecuritySettingsSchema = (t: TranslationFunctionType) =>
  yup.object({
    password: yup
      .string()
      .required(t('VALIDATION.REQUIRED_PASSWORD'))
      .min(8, t('VALIDATION.MIN_8_CHARS'))
      .matches(/[A-Za-z]/, t('VALIDATION.PASSWORD_LETTERS'))
      .matches(/\d/, t('VALIDATION.PASSWORD_DIGITS')),

    newPassword: yup
      .string()
      .required(t('VALIDATION.REQUIRED_NEW_PASSWORD'))
      .min(8, t('VALIDATION.MIN_8_CHARS'))
      .matches(/[A-Za-z]/, t('VALIDATION.PASSWORD_LETTERS'))
      .matches(/\d/, t('VALIDATION.PASSWORD_DIGITS'))
      .notOneOf([yup.ref('password')], t('VALIDATION.PASSWORD_MATCH')),

    login: yup
      .string()
      .required(t('VALIDATION.REQUIRED_LOGIN'))
      .test('email-or-username', t('VALIDATION.VALID_EMAIL_USERNAME'), (value) => {
        if (!value) return false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

        return emailRegex.test(value) || usernameRegex.test(value);
      }),
  });

export type SecuritySettingsFormValuesType = yup.InferType<
  ReturnType<typeof createSecuritySettingsSchema>
>;
