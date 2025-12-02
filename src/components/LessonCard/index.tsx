import { FC } from 'react';

import { StarIcon } from '@/components/Icons';
import { useTranslation } from '@/hooks';
import { normalizeToFive } from '@/lib/utils';

import { LessonCardPropsType } from './typings';

import {
  CardContent,
  LeftContent,
  RatingContainer,
  RatingHeading,
  RightContent,
  StyledButton,
  StyledCardWrapper,
  StyledHeading,
  TaskList,
  TaskListItem,
  TitleSpan,
} from './styles';

const LessonCard: FC<LessonCardPropsType> = (props) => {
  const { id, title, progress, index, onClick } = props;
  const { t } = useTranslation();

  const blocked = false;
  const active = true;

  const taskProgress = [
    { title: t('LESSON_CARD.THEORY') },
    { title: t('LESSON_CARD.ORAL_PRACTICE') },
    { title: t('LESSON_CARD.TEST_TASK') },
  ];

  return (
    <StyledCardWrapper
      active={active}
      blocked={blocked}
      onClick={() => onClick(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(id);
      }}
    >
      <CardContent>
        <LeftContent>
          <StyledHeading>
            {t('LESSON_CARD.LESSON')} {index + 1} -{' '}
            <TitleSpan active={active} blocked={blocked}>
              {title}
            </TitleSpan>
          </StyledHeading>

          <TaskList>
            {taskProgress.map(({ title }, idx) => (
              <TaskListItem key={idx}>{title}</TaskListItem>
            ))}
          </TaskList>
        </LeftContent>

        <RightContent>
          <RatingContainer>
            <StarIcon type={blocked ? 'disabled' : 'gold'} />
            <RatingHeading blocked={blocked}>
              {progress.testResult ? normalizeToFive(progress.testResult) : 0}/5
            </RatingHeading>
          </RatingContainer>

          {!blocked && (
            <StyledButton
              isActive={active}
              onClick={(e) => {
                e.stopPropagation();
                onClick(id);
              }}
            >
              {t(active ? 'MODULES_CARD.START' : 'MODULES_CARD.COMPLETED')}
            </StyledButton>
          )}
        </RightContent>
      </CardContent>
    </StyledCardWrapper>
  );
};

export default LessonCard;
