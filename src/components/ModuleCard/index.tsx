'use client';

import { memo, useMemo, type FC } from 'react';
import { useSelector } from 'react-redux';

import { type IModuleInfo } from '@/api/endpoints/modules';
import Button from '@/components/Button';
import DotTitle from '@/components/DotTitle';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { useRouter, useTranslation } from '@/hooks';
import { pluralize } from '@/lib/utils';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { constants } from './const';
import { renderModuleProgress } from './utils';

import {
  BottomSection,
  ButtonContainer,
  CardContainer,
  ContentWrapper,
  DotTitleWrapper,
  LeftContent,
  StyledImage,
  TopSection,
} from './styles';

const ModuleCardComponent: FC<IModuleInfo & { className?: string }> = (props) => {
  const {
    totalLessons,
    completedLessons,
    completionStatus,
    description,
    title,
    id,
    sequenceOrder,
    className,
  } = props;

  const { t } = useTranslation();
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.Mentor;

  const bonus = false;

  const { element: progressElement, status: progressStatus } = renderModuleProgress(
    completionStatus,
    completedLessons,
    totalLessons,
  );

  const router = useRouter();

  const { active, completed, blocked } = constants.status;

  const { isBlocked, isCompleted } = useMemo(
    () => ({
      isBlocked: progressStatus === blocked,
      isCompleted: progressStatus === completed,
      isActive: progressStatus === active,
    }),
    [progressStatus, active, completed, blocked],
  );

  const moduleLabel = bonus
    ? t('MODULES_CARD.BONUS')
    : t('MODULES_CARD.MODULE', { number: sequenceOrder });

  const lessonInfo = `${pluralize(
    totalLessons,
    t('MODULES_CARD.LESSON_ONE'),
    t('MODULES_CARD.LESSON_TWO'),
    t('MODULES_CARD.LESSON_MANY'),
  )}`;

  const taskInfo = `${pluralize(
    totalLessons * 2,
    t('MODULES_CARD.TASK_ONE'),
    t('MODULES_CARD.TASK_TWO'),
    t('MODULES_CARD.TASK_MANY'),
  )}`;

  const handleCardClick = () => {
    if (isBlocked && !isMentor) return;

    router.push(isMentor ? `${routes.mentor.modules}/${id}` : `${routes.user.modules}/${id}`);
  };

  return (
    <CardContainer
      bonus={bonus}
      isBlocked={isBlocked}
      isMentor={isMentor}
      onClick={handleCardClick}
      className={className}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleCardClick();
      }}
    >
      <ContentWrapper>
        <LeftContent>
          <TopSection>
            <DotTitle
              firstLabel={t(moduleLabel)}
              secondLabel={title}
              firstVariant="m-bold"
              secondVariant="m"
              firstClassName="module-card-title-first"
              secondClassName="module-card-title-second"
            />
            <Text>{description}</Text>
          </TopSection>
          <BottomSection>
            <DotTitleWrapper bonus={bonus}>
              <DotTitle
                firstLabel={lessonInfo}
                secondLabel={taskInfo}
                firstVariant="m"
                secondVariant="m"
              />
            </DotTitleWrapper>

            <ButtonContainer>
              <Button
                disabled={!isMentor && isBlocked}
                variant={isCompleted ? 'white' : 'blue'}
                size="small"
              >
                {isMentor && isBlocked ? t('MODULES_CARD.START') : t(progressStatus)}
              </Button>
              {progressElement}
            </ButtonContainer>
          </BottomSection>
        </LeftContent>
        <StyledImage width={115} height={115} src="/images/astronaut1.webp" alt="moduleimg" />
      </ContentWrapper>
    </CardContainer>
  );
};

export const ModuleCard = memo(ModuleCardComponent);
