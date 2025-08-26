import * as yup from 'yup';
import { QuestionAnswer } from './lesson-test-form';

const QuestionAnswerSchema: yup.ObjectSchema<QuestionAnswer> = yup
  .object({
    text: yup.string().required(),
    answer: yup.string().optional(),
    file: yup.mixed<Blob>().nullable().optional(),
    fileUrl: yup.string().optional(),
  })
  .test(
    'answer-or-file',
    'Нужно заполнить ответ или прикрепить файл (но не оба сразу)',
    function (value) {
      const hasAnswer = !!value?.answer?.trim();
      const hasFile = !!value?.file;

      if (hasAnswer && hasFile) {
        return this.createError({
          path: `${this.path}.answer`,
          message: 'Заполните либо ответ, либо приложите файл',
        });
      }

      return true;
    },
  );

export const LessonTestFormSchema = yup.object({
  lesson_id: yup.string().required(),
  module_id: yup.string().required(),
  questions: yup
    .array()
    .of(QuestionAnswerSchema)
    .required()
    .min(1, 'Должен быть хотя бы один вопрос'),
});
