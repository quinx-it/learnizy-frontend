'use client';

import { FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import DotTitle from '@/components/DotTitle';
import ProgressBar from '@/components/Progress';
import { useTranslation } from '@/hooks';

import { ProgressStatus } from './constants';
import { ProgressCardPropsType } from './typings';

import {
  Container,
  ContentWrapper,
  DotTitleWrapper,
  ProgressBarWrapper,
  StatsContainer,
  StatsRow,
  StatusButton,
  StyledImage,
  StyledText,
} from './styles';

const ProgressCard: FC<ProgressCardPropsType> = (props) => {
  const { title, subTitle, totalModules, totalLessons, lessons, status, modules, image, onClick } =
    props;

  const { t } = useTranslation();

  const hasModules = totalModules !== undefined && modules !== undefined;

  const progressValue = lessons / totalLessons !== 0 ? (lessons / totalLessons) * 100 : 1;

  return (
    <CardWrapper>
      <Container>
        {image && <StyledImage width={49} height={58} src={image} alt="rocket" />}

        <ContentWrapper>
          <DotTitleWrapper>
            <DotTitle
              firstLabel={title}
              secondLabel={subTitle}
              firstClassName="progress-card-title-first"
              secondClassName="progress-card-title-second"
            />
          </DotTitleWrapper>
          <StatsContainer>
            <StatsRow>
              {hasModules && (
                <StyledText>
                  {t('PROGRESS_CARD.MODULES_LABEL')}: {modules}/{totalModules}
                </StyledText>
              )}
              <StyledText>
                {t('PROGRESS_CARD.LESSONS_LABEL')}: {lessons}/{totalLessons}
              </StyledText>
            </StatsRow>
            <ProgressBarWrapper>
              <ProgressBar value={progressValue} />
            </ProgressBarWrapper>
          </StatsContainer>
        </ContentWrapper>

        {status && (
          <StatusButton size="small" onClick={onClick}>
            {status === ProgressStatus.Continue ? t('COMMON.STATUS_CONTINUE') : t('STATUS.START')}
          </StatusButton>
        )}
      </Container>
    </CardWrapper>
  );
};

export default ProgressCard;
