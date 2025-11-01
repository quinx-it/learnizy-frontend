import { CardWrapper } from '@/shared/components/CardWrapper';
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Typography';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const InterviewQuestions = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper className="relative flex flex-col gap-4 overflow-hidden">
      <Text variant="m" className="text-medium">
        {t('INTERVIEW.TITLE')}
      </Text>
      <hr />
      <div>
        <Text variant="m" className="mb-2">
          {t('INTERVIEW.DESCRIPTION_1')}
        </Text>
        <Text variant="s" className="text-medium w-3/4">
          {t('INTERVIEW.DESCRIPTION_2')}
        </Text>
      </div>

      <Button variant="blue" size="small" asChild className="w-fit">
        <Link href={routes.user.interviewQuestions}>{t('INTERVIEW.BUTTON')}</Link>
      </Button>

      <Image
        src="/images/planet-with-disc-blue.webp"
        alt=""
        className="absolute right-0 bottom-0 translate-x-12 translate-y-4"
        width={176}
        height={88}
      />
    </CardWrapper>
  );
};
