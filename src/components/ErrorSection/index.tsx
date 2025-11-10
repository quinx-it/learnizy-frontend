import Image from 'next/image';
import { FC } from 'react';

import Button from '@/components/Button';
import { Heading, Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';
import { cn } from '@/lib/utils';

import { ErrorPropsType, ErrorType } from './typings';

const ErrorSection: FC<ErrorPropsType & ErrorType> = (props) => {
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

export default ErrorSection;
