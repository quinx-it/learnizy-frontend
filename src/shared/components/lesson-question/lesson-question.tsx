'use client';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radioGroup';
import { Textarea } from '@/shared/ui/textarea';
import { Text } from '@/shared/ui/typography';
import { Controller, FieldErrors, useFormContext, useWatch } from 'react-hook-form';
import { VoiceRecorderControl } from '../voice-recorder-control';
import { LessonTestFormValues } from '@/shared/components/lesson-test-form';

export type LessonQuestionItemType = {
  type?: 'checkbox' | 'field';
  index: number;
  totalQuestions: number;
  question: {
    text: string;
    options: { id: string; label: string; value: string }[];
  };
  answerFieldName: string;
  fileFieldName: string;
  errors: FieldErrors<LessonTestFormValues>;
};

export const LessonQuestion = ({
  type = 'checkbox',
  index,
  totalQuestions,
  question,
  answerFieldName,
  fileFieldName,
  errors,
}: LessonQuestionItemType) => {
  const { control, setValue } = useFormContext();

  const answerValue = useWatch({ name: answerFieldName });
  const fileValue = useWatch({ name: fileFieldName });

  const error = errors.questions?.[index]?.answer || errors.questions?.[index]?.file;

  return (
    <div className="space-y-5">
      <Text variant="l" className="text-medium mb-3">
        Вопрос {index} из {totalQuestions}
      </Text>
      <Text variant="l" className="mb-5">
        {question.text}
      </Text>

      {type === 'checkbox' ? (
        <Controller
          name={answerFieldName}
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="mx-0 flex w-fit flex-col space-y-3"
            >
              {question.options.map((option) => (
                <RadioGroupItem
                  key={option.id}
                  className="cursor-pointer flex-row-reverse"
                  value={option.value}
                  id={option.id}
                >
                  {option.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          )}
        />
      ) : (
        <>
          {!fileValue && (
            <Controller
              name={answerFieldName}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="min-h-[60px] max-w-[728px] resize-none py-0.5"
                  onChange={(e) => {
                    setValue(fileFieldName, null);
                    field.onChange(e);
                  }}
                />
              )}
            />
          )}

          {!answerValue && (
            <Controller
              name={fileFieldName}
              control={control}
              render={({ field }) => (
                <VoiceRecorderControl
                  onChange={(file) => {
                    setValue(answerFieldName, '');
                    field.onChange(file);
                  }}
                />
              )}
            />
          )}
        </>
      )}

      {error?.message && <p className="text-error">{error.message}</p>}
    </div>
  );
};
