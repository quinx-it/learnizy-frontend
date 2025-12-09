import * as yup from 'yup';

import { TranslationFunctionType } from '@/types';

export interface IResetPasswordFormValues {
  password: string;
  repeatPassword: string;
}

export const createFormSchema = (t: TranslationFunctionType) =>
  yup.object().shape({
    password: yup
      .string()
      .min(8, t('VALIDATION.MIN_8_CHARS'))
      .required(t('VALIDATION.REQUIRED_PASSWORD_AUTH')),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('VALIDATION.PASSWORDS_MATCH'))
      .required(t('VALIDATION.REPEAT_PASSWORD')),
  });
