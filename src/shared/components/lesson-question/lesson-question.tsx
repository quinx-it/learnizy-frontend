'use client';
import { Button } from '@/shared/ui/button';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radioGroup';
import { Textarea } from '@/shared/ui/textarea';
import { Text } from '@/shared/ui/typography';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type LessonQuestionItemType = {
  type?: 'checkbox' | 'field';
  index: number;
  totalQuestions: number;
  question: { text: string; options: { id: string; label: string; value: string }[] };
  name?: string;
};

export const LessonQuestion = ({
  type = 'checkbox',
  index,
  totalQuestions,
  question,
  name,
}: LessonQuestionItemType) => {
  const { control, register } = useFormContext();

  if (type === 'checkbox') {
    return (
      <div>
        <Text variant="l" className="text-medium mb-5">
          Вопрос {index} из {totalQuestions}
        </Text>
        <Text variant="l" className="mb-5">
          {question.text}
        </Text>

        <Controller
          name={name!}
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
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Text variant="l" className="text-medium mb-5">
        Вопрос {index} из {totalQuestions}
      </Text>
      <Text variant="l" className="mb-5">
        {question.text}
      </Text>
      <div className="max-w-[728px]">
        <Textarea className="min-h-[60px] resize-none py-0.5" {...register(name!)} />
      </div>
      <Button type="button">Ответить голосом</Button>
    </div>
  );
};
