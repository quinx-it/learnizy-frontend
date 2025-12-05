'use client';

import { FC } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { RadioGroup } from '@/components/RadioGroup';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { LessonQuestionPropsType } from './typings';

import {
  Container,
  ErrorMessage,
  QuestionNumber,
  QuestionText,
  RadioGroupWrapper,
  StyledTextarea,
} from './styles';

const LessonQuestion: FC<LessonQuestionPropsType> = (props) => {
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
    <Container>
      <QuestionNumber>
        <Text variant="l">
          {t('LESSON_QUESTION.QUESTION_NUMBER', { current: sequenceOrder, total: totalQuestions })}
        </Text>
      </QuestionNumber>
      <QuestionText>
        <Text variant="l">{text}</Text>
      </QuestionText>

      {type === 'checkbox' ? (
        <Controller
          name={answerFieldName}
          control={control}
          render={({ field }) => (
            <RadioGroupWrapper>
              <RadioGroup value={field.value} onValueChange={field.onChange} />
            </RadioGroupWrapper>
          )}
        />
      ) : (
        !fileValue && (
          <Controller
            name={answerFieldName}
            control={control}
            render={({ field }) => (
              <StyledTextarea
                {...field}
                onChange={(e) => {
                  setValue(fileFieldName, null);
                  field.onChange(e);
                }}
              />
            )}
          />
        )
      )}

      {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
    </Container>
  );
};

export default LessonQuestion;
