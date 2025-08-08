'use client'
import React, { useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Heading, Text } from '@/shared/ui/typography';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';

type ErrorProps = {
  className?: string;
  text?: string;
  title?: string;
  error: Error & { digest?: string };
  reset: () => void;
};

export const ErrorSection = ({
  className,
  reset,
  error,
  title = 'Упс, произошла ошибка..',
  text = 'Мы уже знаем об этом и работаем над её устранением. \n Пожалуйста, попробуйте позже.',
}: ErrorProps) => {


   useEffect(() => {
     console.error(error);
   }, [error]);


  const handleError = () => {
    reset();
  };

  return (
    <div className='h-screen flex items-center'>
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
