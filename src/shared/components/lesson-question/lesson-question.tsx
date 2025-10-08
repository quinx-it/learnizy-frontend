'use client';
import { RadioGroup } from '@/shared/ui/radioGroup';
import { Textarea } from '@/shared/ui/textarea';
import { Text } from '@/shared/ui/typography';
import { Controller, FieldErrors, useFormContext, useWatch } from 'react-hook-form';
import { VoiceRecorderControl } from '../voice-recorder-control';
import { LessonQuestionItemType, LessonTestFormValuesType } from '@/api/endpoints/test/types';

type LessonQuestionPropsType = LessonQuestionItemType & {
  type?: 'checkbox' | 'field';
  answerFieldName: string;
  fileFieldName: string;
  errors: FieldErrors<LessonTestFormValuesType>;
  totalQuestions: number;
};

export const LessonQuestion = ({
  type = 'checkbox',
  totalQuestions,
  sequenceOrder,
  text,
  answerFieldName,
  fileFieldName,
  errors,
}: LessonQuestionPropsType) => {
  const { control, setValue } = useFormContext();

  const answerValue = useWatch({ name: answerFieldName });
  const fileValue = useWatch({ name: fileFieldName });

  const { textAnswer, file } = errors.questions?.[sequenceOrder] ?? {};
  const error = textAnswer ?? file;

  return (
    <div className="space-y-5">
      <Text variant="l" className="text-medium mb-3">
        Вопрос {sequenceOrder} из {totalQuestions}
      </Text>
      <Text variant="l" className="mb-5">
        {text}
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
              {/*  {question?.options.map((option) => (
                <RadioGroupItem
                  key={option.id}
                  className="cursor-pointer flex-row-reverse"
                  value={option.value}
                  id={option.id}
                >
                  {option.label}
                </RadioGroupItem>
              ))} */}
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
