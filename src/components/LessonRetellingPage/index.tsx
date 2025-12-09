import { FC } from 'react';

import { useGetLessonQuery } from '@/api/endpoints/lessons';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import FullscreenLoader from '@/components/FullscreenLoader';
import VoiceRecorderForm from '@/components/VoiceRecorderForm';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';

import { createBreadcrumbs } from './const';
import { ILessonRetellingPageProps } from './typings';

import {
  CardWrapperContainer,
  Container,
  DescriptionText,
  EmphasisText,
  StyledDivider,
  TitleText,
} from './styles';

const LessonRetellingPage: FC<ILessonRetellingPageProps> = (props) => {
  const { module, lesson } = props;
  const { t } = useTranslation();

  const { data: lessonData, isLoading } = useGetLessonQuery(lesson);

  if (isLoading) return <FullscreenLoader />;

  if (!lessonData) return null;

  const { sequenceOrder, moduleSequenceOrder } = lessonData;

  const breadcrumbs = createBreadcrumbs(t);

  return (
    <Container>
      <Breadcrumbs
        items={breadcrumbs(moduleSequenceOrder ?? 1, module, lesson, sequenceOrder + 1)}
        rootHref={routes.user.modules}
        rootLabel={t('LESSON_RETELLING.MODULES')}
      />
      <CardWrapper>
        <CardWrapperContainer>
          <TitleText variant="l-bold">{t('LESSON_RETELLING.ASK_QUESTION')}</TitleText>
          <StyledDivider />
          <DescriptionText variant="l">{t('LESSON_RETELLING.DESCRIPTION')}</DescriptionText>
          <EmphasisText variant="l">{t('LESSON_RETELLING.EMPHASIS')}</EmphasisText>

          <VoiceRecorderForm lessonId={Number(lesson)} />
        </CardWrapperContainer>
      </CardWrapper>
    </Container>
  );
};

export default LessonRetellingPage;
