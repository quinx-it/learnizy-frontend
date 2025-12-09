import * as yup from 'yup';

import { TranslationFunctionType } from '@/types';

export const MAX_FILE_SIZE = 30 * 1024 * 1024;

export const createSchema = (t: TranslationFunctionType) =>
  yup.object({
    file: yup
      .mixed<Blob>()
      .required(t('VALIDATION.NO_RECORDING'))
      .test('fileSize', t('VALIDATION.RECORDING_TOO_LONG'), (value) => {
        return value ? value.size <= MAX_FILE_SIZE : false;
      })
      .test('is-blob', t('VALIDATION.NOT_AUDIO_FILE'), (value) => {
        return value instanceof Blob;
      }),
  });
