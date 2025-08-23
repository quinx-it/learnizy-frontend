'use client';
import { Text } from '@/shared/ui/typography';
import { LessonQuestion, LessonQuestionItemType } from '@/shared/components/lesson-question';
import { Button } from '@/shared/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { Spinner } from '@/shared/ui/spinner';
import { useState } from 'react';
import { showToast } from '@/shared/ui/toaster';
import { yupResolver } from '@hookform/resolvers/yup';
import { LessonTestFormSchema } from './validation';
import { useUploadVoiceMutation } from '@/api/endpoints/voice';

export type QuestionAnswer = {
  text: string;
  answer?: string;
  file?: Blob | null;
  fileUrl?: string | null;
};

export type LessonTestFormValues = {
  lesson_id: string;
  module_id: string;
  questions: QuestionAnswer[];
};

type LessonTestFormProps = {
  lessonId: string;
  moduleId: string;
  questions: LessonQuestionItemType[];
  onSubmit: (data: LessonTestFormValues) => void;
};

export const LessonTestForm = ({
  lessonId,
  moduleId,
  questions,
  onSubmit,
}: LessonTestFormProps) => {
  const [forceSubmit, setForceSubmit] = useState(false);
  const [uploadVoice] = useUploadVoiceMutation();

  const methods = useForm<LessonTestFormValues>({
    defaultValues: {
      lesson_id: lessonId,
      module_id: moduleId,
      questions: [],
    },
    resolver: yupResolver(LessonTestFormSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleSubmitForm = async (data: LessonTestFormValues) => {
    try {
      const isEmpty = Object.values(data.questions).some((q) => !q?.answer?.trim() && !q?.file);
      if (!forceSubmit && isEmpty) {
        showToast('info', 'Вы уверены?', 'У вас есть незаполненные поля');
        setForceSubmit(true);
        return;
      }
      const updatedData: LessonTestFormValues = {
        ...data,
        questions: [...data.questions],
      };

      for (let i = 1; i < data.questions.length; i++) {
        const q = data.questions[i];
        if (q?.file) {
          const formData = new FormData();
          formData.append('file', q.file, `recording-${i}.webm`);
          const { downloadUrl } = await uploadVoice(formData).unwrap();
          updatedData.questions[i].fileUrl = downloadUrl;
        }
      }

      await onSubmit(updatedData);

      showToast('info', 'Отлично!', 'Тест пройден');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ul>
          {questions.map(({ type, index, totalQuestions, question }) => (
            <li key={index} className="border-gray border-b py-16 first:pt-0">
              <input
                type="hidden"
                {...methods.register(`questions.${index}.text`)}
                value={question.text}
              />
              <LessonQuestion
                index={index}
                type={type}
                totalQuestions={totalQuestions}
                question={question}
                answerFieldName={`questions.${index}.answer`}
                fileFieldName={`questions.${index}.file`}
                errors={errors}
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-5">
          <Text variant={'l'}>
            Проверьте, что вы довольны своими результатами, и нажмите кнопку ниже, чтобы узнать свой
            балл и увидеть разбор вопросов.
          </Text>
          <Button type="submit" disabled={isSubmitting} className="mb-0">
            {isSubmitting ? <Spinner variant="circle" /> : 'Отправить'}
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
