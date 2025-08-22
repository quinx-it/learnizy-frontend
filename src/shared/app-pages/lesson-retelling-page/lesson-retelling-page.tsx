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
      <CardWrapper className='mt-6 flex flex-col gap-4'>
        <Text variant="l-bold" className="text-medium">
          Проговорите вслух
        </Text>
        <hr />
        <Text variant='l'>
          Нажмите кнопку записи и своими словами перескажите основные идеи урока. Говорите чётко, не
          читая текст, словно объясняете это коллеге или другу. Такой метод поможет запомнить
          информацию и увереннее чувствовать себя на собеседовании.
        </Text>
        <Text variant='l' className='text-medium'>Говорите свободно. Ошибки — часть обучения!</Text>

        <VoiceRecorderForm />
      </CardWrapper>
    </div>
  );
};
