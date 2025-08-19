'use client';
import { Text } from '@/shared/ui/typography';
import {
  LessonQuestion,
  LessonQuestionItemType,
} from '@/shared/components/lesson-question';
import { Button } from '@/shared/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { Spinner } from '@/shared/ui/spinner';
import { useState } from 'react';
import { showToast } from '@/shared/ui/toaster';

export type QuestionAnswer = {
  text: string;
  answer: string;
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

  const methods = useForm<LessonTestFormValues>({
    defaultValues: {
      lesson_id: lessonId,
      module_id: moduleId,
      questions: [],
    },
  });
  const {
    handleSubmit,
    formState: { errors, isLoading },
  } = methods;

  const handleSubmitForm = (data: LessonTestFormValues) => {
    try {
      const isEmpty = Object.values(data.questions).some((q) => !q?.answer?.trim());
      if (!forceSubmit && isEmpty) {
        showToast('info', 'Вы уверены?', 'У вас есть незаполненные поля');
        setForceSubmit(true);
        return;
      }
      onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ul>
          {questions.map(({ type, index, totalQuestions, question }) => (
            <li
              className={index === 1 ? 'border-gray border-b pb-16' : 'border-gray border-b py-16'}
              key={index}
            >
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
                name={`questions.${index}.answer`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-8 space-y-5">
          <Text variant={'l'}>
            Проверьте, что вы довольны своими результатами, и нажмите кнопку ниже, чтобы узнать свой
            балл и увидеть разбор вопросов.
          </Text>
          <Button disabled={isLoading} className="mb-0">
            {isLoading ? <Spinner variant="circle" /> : 'Отправить'}
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
