import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Heading, Text } from '@/shared/ui/typography';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { ErrorPropsType, ErrorType } from './typings';

export const ErrorSection: FC<ErrorPropsType & ErrorType> = (props) => {
  const {
    className,
    reset,
    title = 'Упс, произошла ошибка..',
    text = 'Мы уже знаем об этом и работаем над её устранением. \n Пожалуйста, попробуйте позже.',
  } = props;

  const handleError = () => {
    reset();
  };

  return (
    <div className="flex h-screen items-center">
      <div
        className={cn(
          'text-deep relative m-auto flex flex-col items-center gap-5 text-center',
          className,
        )}
      >
        <Image
          width={110}
          height={105}
          src="/images/error-astronaut.webp"
          alt="astronaut"
          className="md:max-w-[110px]"
        />
        <div className="space-y-3">
          <Heading variant={'xl-bold'}>{title}</Heading>
          <Text className="whitespace-pre-wrap" variant={'m'}>
            {text}
          </Text>
        </div>
        <Button onClick={handleError}>Обновить страницу</Button>
      </div>
    </div>
  );
};
