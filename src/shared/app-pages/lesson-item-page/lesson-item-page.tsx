'use client';

import { BlockRenderer } from '@/shared/components/content-block-parser/content-block-parser';
import React from 'react';
import { useGetLessonQuery } from '@/api/endpoints/lessons';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Heading, Text } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { routes } from '@/shared/constants';
import { constants } from './constants';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';

interface LessonItemPageProps {
  lessonId: string;
  moduleId: string;
}

export const LessonItemPage: React.FC<LessonItemPageProps> = ({ lessonId, moduleId }) => {
  const breadcrumbs = constants.breadcrumbs;
  const pathname = usePathname();
  const router = useRouter();

  const HandleRetellingClick = () => {
    router.push(`${pathname}/retelling`);
  };
  const HandleTestClick = () => {
    router.push(`${pathname}/test`);
  };

  const { data, isLoading } = useGetLessonQuery(lessonId);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <FullscreenLoader />
      ) : (
        <div className="flex flex-col gap-6">
          <Breadcrumbs
            items={breadcrumbs(4, moduleId, data?.sequenceOrder ?? 0)}
            rootHref={routes.user.modules}
            rootLabel={'Структура обучения'}
          />
          <h1>
            {lessonId}, {moduleId}
          </h1>
          {data && (
            <CardWrapper>
              <Heading>{data.title}</Heading>
              <Heading>{data.description}</Heading>
              {data?.contentBlocks &&
                data?.contentBlocks.map((block) => <BlockRenderer key={block.id} block={block} />)}
            </CardWrapper>
          )}
          <CardWrapper>
            <Heading variant="2xl" className="mb-4">
              Проговорите вслух
            </Heading>
            <Text variant="l" className="mb-6">
              После изучения теории закрепите материал, пересказав его своими словами. Это поможет
              лучше запомнить ключевые моменты, структурировать знания и тренировать навык устного
              объяснения — важный для успешного прохождения собеседований.
            </Text>
            <Button onClick={HandleRetellingClick}>Начать</Button>
          </CardWrapper>
          <CardWrapper>
            <Heading variant="2xl" className="mb-4">
              Проверь свои знания
            </Heading>
            <Text variant="l" className="mb-6">
              Пройдите короткий тест, чтобы закрепить материал и проверить понимание темы. Не
              спешите — отвечайте вдумчиво, ведь именно сейчас вы формируете прочную основу для
              успешного прохождения собеседований.
            </Text>
            <Button onClick={HandleTestClick}>Начать</Button>
          </CardWrapper>
        </div>
      )}
    </>
  );
};
