import Image from 'next/image';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Heading, Text } from '@/ui/typography';

import { ErrorPropsType, ErrorType } from './typings';

export const ErrorSection: FC<ErrorPropsType & ErrorType> = (props) => {
  const { t } = useTranslation();

  const { className, reset } = props;

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
          <Heading variant="xl-bold">{t('ERROR_SECTION.TITLE')}</Heading>
          <Text className="whitespace-pre-wrap" variant="m">
            {t('ERROR_SECTION.TEXT')}
          </Text>
        </div>
        <Button onClick={handleError}>{t('ERROR_SECTION.BUTTON')}</Button>
      </div>
    </div>
  );
};
