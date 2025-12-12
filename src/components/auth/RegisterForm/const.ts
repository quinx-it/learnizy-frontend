import * as yup from 'yup';

import { type TranslationFunctionType } from '@/types';

export const createFormSchema = (t: TranslationFunctionType) =>
  yup.object().shape({
    login: yup
      .string()
      .required(t('VALIDATION.REQUIRED_USERNAME'))
      .matches(/^[a-zA-Z0-9._-]{3,50}$/, t('VALIDATION.USERNAME_FORMAT')),
    email: yup
      .string()
      .required(t('VALIDATION.REQUIRED_EMAIL'))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('VALIDATION.INVALID_EMAIL')),
    password: yup
      .string()
      .min(6, t('VALIDATION.MIN_6_CHARS'))
      .max(100, t('VALIDATION.MAX_100_CHARS'))
      .required(t('VALIDATION.REQUIRED_PASSWORD_AUTH')),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('VALIDATION.PASSWORDS_MATCH'))
      .required(t('VALIDATION.REPEAT_PASSWORD')),
    agreement: yup
      .boolean()
      .oneOf([true], t('VALIDATION.ACCEPT_AGREEMENT'))
      .required(t('VALIDATION.ACCEPT_AGREEMENT')),
  });

export const createVerificationSchema = (t: TranslationFunctionType) =>
  yup.object().shape({
    code: yup
      .string()
      .required(t('VALIDATION.REQUIRED_CODE'))
      .length(6, t('VALIDATION.CODE_6_DIGITS')),
  });
