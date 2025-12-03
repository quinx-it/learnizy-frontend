import { FC } from 'react';

import { useGetLessonQuery } from '@/api/endpoints/lessons';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import FullscreenLoader from '@/components/FullscreenLoader';
import VoiceRecorderForm from '@/components/VoiceRecorderForm';
import { routes } from '@/const';

import { constants } from './constants';
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

  const { data: lessonData, isLoading } = useGetLessonQuery(lesson);

  if (isLoading) return <FullscreenLoader />;

  if (!lessonData) return null;

  const { sequenceOrder, moduleSequenceOrder } = lessonData;

  return (
    <Container>
      <Breadcrumbs
        items={constants.breadcrumbs(moduleSequenceOrder ?? 1, module, lesson, sequenceOrder + 1)}
        rootHref={routes.user.modules}
        rootLabel="Модули"
      />
      <CardWrapper>
        <CardWrapperContainer>
          <TitleText variant="l-bold">Задайте вопрос</TitleText>
          <StyledDivider />
          <DescriptionText variant="l">
            Нажмите кнопку записи и задайте интересующий вопрос по пройденной теме. Говорите чётко,
            словно задаёте вопрос коллеге или другу. Такой метод поможет лучше понять пройденный
            материал и увереннее чувствовать себя на собеседовании.
          </DescriptionText>
          <EmphasisText variant="l">Говорите свободно. Вопросы — часть обучения!</EmphasisText>

          <VoiceRecorderForm lessonId={Number(lesson)} />
        </CardWrapperContainer>
      </CardWrapper>
    </Container>
  );
};

export default LessonRetellingPage;
