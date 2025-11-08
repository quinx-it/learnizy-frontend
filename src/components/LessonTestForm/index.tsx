'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState, FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  AnswerInputType,
  LessonTestFormValuesType,
  LessonTestSubmitType,
} from '@/api/endpoints/test';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import Button from '@/components/Button';
import LessonQuestion from '@/components/LessonQuestion';
import Spinner from '@/components/Spinner';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import { usePathname, useRouter, useTranslation } from '@/hooks';

import { LessonTestFormPropsType } from './typings';
import { LessonTestFormSchema } from './validation';

const LessonTestForm: FC<LessonTestFormPropsType> = (props) => {
  const { questions, onSubmit, testId, loading } = props;
  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();
  const [forceSubmit, setForceSubmit] = useState(false);
  const [uploadVoice] = useUploadVoiceMutation();

  const methods = useForm<LessonTestFormValuesType>({
    defaultValues: { questions: [] },
    resolver: yupResolver(LessonTestFormSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: LessonTestFormValuesType) => {
    try {
      const isEmpty = Object.values(data.questions).some((q) => !q?.textAnswer?.trim() && !q?.file);

      if (!forceSubmit && isEmpty) {
        showToast('info', t('LESSON_TEST.CONFIRM_TITLE'), t('LESSON_TEST.CONFIRM_TEXT'));
        setForceSubmit(true);

        return;
      }

      const uploadedQuestions = await Promise.all(
        data.questions.map(async (q, index) => {
          if (q.file) {
            const formData = new FormData();
            formData.append('file', q.file, `recording-${index}.webm`);
            const { downloadUrl } = await uploadVoice(formData).unwrap();

            return {
              questionId: questions[index].questionId,
              inputType: AnswerInputType.VOICE,
              voiceFileUrl: downloadUrl,
              voiceTranscript: q.voiceTranscript ?? null,
            };
          }

          return {
            questionId: questions[index].questionId,
            inputType: AnswerInputType.TEXT,
            textAnswer: q.textAnswer ?? null,
          };
        }),
      );

      const updatedData: LessonTestSubmitType = {
        testId,
        answers: uploadedQuestions,
      };

      await onSubmit(updatedData);
      const resultPath = pathname.replace(/\/test$/, '/result');
      router.push(resultPath);
    } catch {
      showToast('error', t('LESSON_TEST.ERROR_TITLE'), t('LESSON_TEST.ERROR_TEXT'));
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ul>
          {questions.map(({ questionId, text, sequenceOrder }) => (
            <li key={questionId} className="border-gray border-b py-16 first:pt-0">
              <input
                type="hidden"
                {...methods.register(`questions.${sequenceOrder}.textAnswer`)}
                value={text}
              />
              <LessonQuestion
                type="field"
                sequenceOrder={sequenceOrder + 1}
                text={text}
                totalQuestions={questions.length}
                questionId={questionId}
                answerFieldName={`questions.${sequenceOrder}.textAnswer`}
                fileFieldName={`questions.${sequenceOrder}.file`}
                errors={errors}
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-5">
          <Text variant="l">{t('LESSON_TEST.INFO_TEXT')}</Text>
          <Button type="submit" disabled={isSubmitting} className="mb-0">
            {isSubmitting || loading ? <Spinner variant="circle" /> : t('LESSON_TEST.SUBMIT')}
          </Button>
          {Object.keys(errors).length > 0 && (
            <Text tag="span" className="text-error ml-8">
              {t('LESSON_TEST.ERROR_FIELD')}
            </Text>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default LessonTestForm;
