import { routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { constants } from './constants';
import { Text } from '@/shared/ui/Typography';
import { useGetLessonQuery } from '@/api/endpoints/lessons';
import React, { FC } from 'react';
import { CardWrapper } from '@/shared/components/cardWrapper';
import { VoiceRecorderForm } from '@/shared/components/voiceRecorderForm';
import { FullscreenLoader } from '@/shared/components/fullscreenLoader/FullscreenLoader';
import { ILessonRetellingPageProps } from './typings';
import Page from '@/shared/components/page';

export const LessonRetellingPage: FC<ILessonRetellingPageProps> = (props) => {
  const { module, lesson } = props;

  const { data: lessonData, isLoading } = useGetLessonQuery(lesson);

  if (isLoading) return <FullscreenLoader />;

  if (!lessonData) return null;

  const { sequenceOrder, moduleSequenceOrder } = lessonData;

  return (
    <Page noIndex>
      <div>
        <Breadcrumbs
          items={constants.breadcrumbs(moduleSequenceOrder ?? 1, module, lesson, sequenceOrder + 1)}
          rootHref={routes.user.modules}
          rootLabel={'Модули'}
        />
        <CardWrapper className="mt-6 flex flex-col gap-4">
          <Text variant="l-bold" className="text-medium">
            Задайте вопрос
          </Text>
          <hr />
          <Text variant="l">
            Нажмите кнопку записи и задайте интересующий вопрос по пройденной теме. Говорите чётко,
            словно задаёте вопрос коллеге или другу. Такой метод поможет лучше понять пройденный
            материал и увереннее чувствовать себя на собеседовании.
          </Text>
          <Text variant="l" className="text-medium">
            Говорите свободно. Вопросы — часть обучения!
          </Text>

          <VoiceRecorderForm lessonId={Number(lesson)} />
        </CardWrapper>
      </div>
    </Page>
  );
};
