'use client';

import { type FC } from 'react';

import ProgressBar from '@/components/Progress';
import { useTranslation } from '@/hooks';

import { CourseListItemStatus, getStatusTranslationKey } from './const';
import { type CourseListItemType } from './typings';

import {
  Container,
  ContentWrapper,
  ModuleWrapper,
  StyledButton,
  StyledModuleText,
  StyledTitleText,
  TitleWrapper,
} from './styles';

const CourseListItem: FC<CourseListItemType> = (props) => {
  const { title, number, status, progress, onClick } = props;

  const { t } = useTranslation();

  const progressBarValue = progress ?? 0;
  const isBlocked = status === CourseListItemStatus.Blocked;

  return (
    <Container>
      <ContentWrapper>
        <ModuleWrapper>
          <StyledModuleText> {`${t('MAIN_PAGE.MODULE')} ${number}`}</StyledModuleText>
          <ProgressBar size={12} strokeWidth={2} variant="circular" value={progressBarValue} />
        </ModuleWrapper>
        <TitleWrapper>
          <StyledTitleText variant="m">{title}</StyledTitleText>
        </TitleWrapper>
      </ContentWrapper>
      {status && (
        <StyledButton
          variant="blue"
          size="small"
          isBlocked={isBlocked}
          onClick={isBlocked ? undefined : onClick}
        >
          {t(getStatusTranslationKey(status))}
        </StyledButton>
      )}
    </Container>
  );
};

export default CourseListItem;
