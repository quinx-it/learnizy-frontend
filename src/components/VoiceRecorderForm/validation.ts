import * as yup from 'yup';

import { TranslationFunctionType } from '@/types';

import { MAX_FILE_SIZE } from './const';

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
