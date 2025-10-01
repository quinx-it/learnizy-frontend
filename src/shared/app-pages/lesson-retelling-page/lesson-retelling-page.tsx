import { routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { constants } from './constants';
import { Text } from '@/shared/ui/typography';

import React from 'react';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { VoiceRecorderForm } from '@/shared/components/voice-recorder-form';

interface LessonRetellingPageProps {
  module: string;
  lesson: string;
}

export const LessonRetellingPage = ({ module, lesson }: LessonRetellingPageProps) => {
  return (
    <div>
      <Breadcrumbs
        items={constants.breadcrumbs(module, lesson)}
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
  );
};
