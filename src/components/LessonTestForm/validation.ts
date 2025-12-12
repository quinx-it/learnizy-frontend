import * as yup from 'yup';

import { type TranslationFunctionType } from '@/types';

const createQuestionAnswerSchema = (t: TranslationFunctionType) =>
  yup
    .object({
      voiceTranscript: yup.string().nullable().optional(),
      textAnswer: yup.string().optional(),
      file: yup.mixed<Blob>().nullable().optional(),
      voiceFileUrl: yup.string().nullable().optional(),
    })
    .test('answer-or-file', t('VALIDATION.ANSWER_OR_FILE'), function testAnswerOrFile(value) {
      const hasAnswer = !!value?.textAnswer?.trim();
      const hasFile = !!value?.file;

      if (hasAnswer && hasFile) {
        return this.createError({
          path: `${this.path}.answer`,
          message: t('VALIDATION.ANSWER_OR_FILE_ONLY'),
        });
      }

      return true;
    });

export const createLessonTestFormSchema = (t: TranslationFunctionType) =>
  yup.object({
    questions: yup.array().of(createQuestionAnswerSchema(t)).required(),
  });
