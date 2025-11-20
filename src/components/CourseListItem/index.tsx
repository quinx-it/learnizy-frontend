'use client';

import { FC } from 'react';

import Button from '@/components/Button';
import ProgressBar from '@/components/Progress';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';
import { cn } from '@/lib/utils';

import { constants } from './constants';
import { CourseListItemType } from './typings';

import { Container, ContentWrapper, ModuleWrapper, TitleWrapper } from './styles';

const CourseListItem: FC<CourseListItemType> = (props) => {
  const { title, number, status, progress, onClick } = props;

  const { t } = useTranslation();

  const progressBarValue = progress ?? 0;
  const isBlocked = status === 'BLOCKED';

  return (
    <Container>
      <ContentWrapper>
        <ModuleWrapper>
          <Text className="text-sm whitespace-nowrap sm:text-base">
            {' '}
            {`${t('MAIN_PAGE.MODULE')} ${number}`}
          </Text>
          <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />
        </ModuleWrapper>
        <TitleWrapper>
          <Text variant="m" className="text-medium">
            {title}
          </Text>
        </TitleWrapper>
      </ContentWrapper>
      {status && (
        <Button
          variant="blue"
          size="small"
          className={cn('!h-8 !w-32 flex-shrink-0 !px-4 !py-1', {
            'cursor-not-allowed opacity-50': isBlocked,
          })}
          onClick={isBlocked ? undefined : onClick}
        >
          {t(constants.statuses[status])}
        </Button>
      )}
    </Container>
  );
};

export default CourseListItem;
