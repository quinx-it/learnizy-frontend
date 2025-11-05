'use client';

import { FC } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { RadioGroup } from '@/components/RadioGroup';
import { Textarea } from '@/components/Textarea';
import { Text } from '@/components/Typography';

import { LessonQuestionPropsType } from './typings';

export const LessonQuestion: FC<LessonQuestionPropsType> = (props) => {
  const {
    type = 'checkbox',
    totalQuestions,
    sequenceOrder,
    text,
    answerFieldName,
    fileFieldName,
    errors,
  } = props;

  const { t } = useTranslation();

  const { control, setValue } = useFormContext();

  const fileValue = useWatch({ name: fileFieldName });

  const { textAnswer, file } = errors.questions?.[sequenceOrder] ?? {};
  const error = textAnswer ?? file;

  return (
    <div className="space-y-5">
      <Text variant="l" className="text-medium mb-3">
        {t('LESSON_QUESTION.QUESTION_NUMBER', { current: sequenceOrder, total: totalQuestions })}
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
        !fileValue && (
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
        )
      )}

      {error?.message && <p className="text-error">{error.message}</p>}
    </div>
  );
};
