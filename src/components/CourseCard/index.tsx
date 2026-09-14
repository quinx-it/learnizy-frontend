'use client';

import { memo, type FC } from 'react';

import Button from '@/components/Button';
import { Text } from '@/components/Typography';
import { ROUTES } from '@/const/routes';
import { useRouter, useTranslation } from '@/hooks';

import { type ICourseCardProps } from './typings';

import {
  BottomSection,
  ButtonContainer,
  CardContainer,
  ContentWrapper,
  LeftContent,
  TopSection,
} from './styles';

const CourseCardComponent: FC<ICourseCardProps> = (props) => {
  const { title, description, id, className, detailsBaseRoute, onEdit, onDelete } = props;
  const { t } = useTranslation();
  const router = useRouter();

  const baseRoute = detailsBaseRoute ?? ROUTES.MENTOR_COURSES;

  const handleCardClick = () => {
    router.push(`${baseRoute}/${id}/modules`);
  };

  return (
    <CardContainer
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
            <Text className="course-card-title">{title}</Text>
            <Text>{description}</Text>
          </TopSection>

          <BottomSection>
            <ButtonContainer>
              <Button
                variant="blue"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
              >
                {t('COMMON.DETAILS')}
              </Button>
              {onEdit && (
                <Button
                  variant="white"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(e);
                  }}
                >
                  {t('COMMON.EDIT')}
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="white"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(e);
                  }}
                >
                  {t('COMMON.DELETE')}
                </Button>
              )}
            </ButtonContainer>
          </BottomSection>
        </LeftContent>
      </ContentWrapper>
    </CardContainer>
  );
};

export const CourseCard = memo(CourseCardComponent);
