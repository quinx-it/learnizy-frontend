import Image from 'next/image';
import { FC } from 'react';

import Button from '@/components/Button';
import CardWrapper from '@/components/CardWrapper';
import Link from '@/components/Link';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';

const InterviewQuestions: FC = () => {
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

export default InterviewQuestions;
