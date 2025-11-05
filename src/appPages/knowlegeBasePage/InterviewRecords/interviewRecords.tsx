import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CardWrapper } from '@/components/CardWrapper';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { routes } from '@/constants';
import { cn } from '@/lib/utils';

import { IInterviewRecordsProps } from './typings';

export const InterviewRecords: FC<IInterviewRecordsProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <CardWrapper className={cn(className, 'flex flex-col gap-4')}>
      <Text variant="m" className="text-medium">
        {t('INTERVIEW_RECORDS.TITLE')}
      </Text>

      <hr />

      <Text variant="m" className="mb-2">
        {t('INTERVIEW_RECORDS.DESCRIPTION')}
      </Text>

      <Button variant="blue" size="small" asChild className="w-fit">
        <Link href={routes.user.interviewRecords}>{t('INTERVIEW_RECORDS.BUTTON')}</Link>
      </Button>
    </CardWrapper>
  );
};
