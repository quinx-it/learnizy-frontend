'use client';

import { FC } from 'react';

import ProgressBar from '@/components/Progress';
import { useTranslation } from '@/hooks';

import { constants, CourseListItemStatus } from './constants';
import { CourseListItemType } from './typings';

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
  const isBlocked = status === CourseListItemStatus.BLOCKED;

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
          {t(constants.statuses[status])}
        </StyledButton>
      )}
    </Container>
  );
};

export default CourseListItem;
