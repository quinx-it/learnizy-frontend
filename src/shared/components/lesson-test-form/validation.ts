import * as yup from 'yup';

const QuestionAnswerSchema = yup
  .object({
    voiceTranscript: yup.string().nullable().optional(),
    textAnswer: yup.string().optional(),
    file: yup.mixed<Blob>().nullable().optional(),
    voiceFileUrl: yup.string().nullable().optional(),
  })
  .test(
    'answer-or-file',
    'Нужно заполнить ответ или прикрепить файл (но не оба сразу)',
    function (value) {
      const hasAnswer = !!value?.textAnswer?.trim();
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
  questions: yup
    .array()
    .of(QuestionAnswerSchema)
    .required()
});
