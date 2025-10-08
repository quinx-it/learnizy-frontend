'use client';
import { Text } from '@/shared/ui/typography';
import { LessonQuestion } from '@/shared/components/lesson-question';
import { Button } from '@/shared/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { Spinner } from '@/shared/ui/spinner';
import { useState } from 'react';
import { showToast } from '@/shared/ui/toaster';
import { yupResolver } from '@hookform/resolvers/yup';
import { LessonTestFormSchema } from './validation';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';
import { useRouter, usePathname } from 'next/navigation';
import {
  AnswerInputType,
  LessonQuestionItemType,
  LessonTestFormValuesType,
  LessonTestSubmitType,
} from '@/api/endpoints/test/types';

type LessonTestFormPropsType = {
  testId: number;
  questions: LessonQuestionItemType[];
  loading?: boolean;
  onSubmit: (data: LessonTestSubmitType) => void;
};

export const LessonTestForm = ({
  questions,
  onSubmit,
  testId,
  loading,
}: LessonTestFormPropsType) => {
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
        showToast('info', 'Вы уверены?', 'У вас есть незаполненные поля');
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
      showToast('error', 'Произошла ошибка', '');
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
          <Text variant={'l'}>
            Нажмите кнопку ниже, чтобы узнать свой балл и увидеть разбор вопросов. Проверка ответов
            может занять некоторое время
          </Text>
          <Button type="submit" disabled={isSubmitting} className="mb-0">
            {isSubmitting || loading ? <Spinner variant="circle" /> : 'Отправить'}
          </Button>
          {Object.keys(errors).length > 0 && (
            <Text tag="span" className="text-error ml-8">
              Ошибка! Попробуйте еще раз.
            </Text>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
