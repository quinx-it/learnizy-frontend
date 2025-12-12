import * as yup from 'yup';

import type { TranslationFunctionType } from '@/types';

export const createPersonalDataSchema = (t: TranslationFunctionType) =>
  yup.object({
    gender: yup
      .string()
      .oneOf(['man', 'woman'], t('VALIDATION.SELECT_GENDER'))
      .required(t('VALIDATION.REQUIRED_GENDER')),
    firstName: yup.string().required(t('VALIDATION.REQUIRED_FIRST_NAME')),
    lastName: yup.string().required(t('VALIDATION.REQUIRED_LAST_NAME')),
    email: yup
      .string()
      .email(t('VALIDATION.INVALID_EMAIL'))
      .required(t('VALIDATION.REQUIRED_EMAIL')),
    address: yup.string().required(t('VALIDATION.REQUIRED_ADDRESS')),
    phone: yup
      .string()
      .transform((value) => {
        if (!value) return '';

        const cleaned = value.trim().replace(/[^\d+]/g, '');

        if (cleaned.startsWith('+')) return cleaned;

        return `+${cleaned}`;
      })
      .matches(/^(\+375|80)(25|29|33|44)\d{7}$|^\+7\d{10}$/, t('VALIDATION.INVALID_PHONE'))
      .required(t('VALIDATION.REQUIRED_PHONE')),
    birthDate: yup.date().nullable().required(t('VALIDATION.REQUIRED_BIRTH_DATE')),
    country: yup.string().required(t('VALIDATION.REQUIRED_COUNTRY')),
    city: yup.string().required(t('VALIDATION.REQUIRED_CITY')),
  });
