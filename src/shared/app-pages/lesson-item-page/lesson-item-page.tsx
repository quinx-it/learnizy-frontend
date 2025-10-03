'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useGetLessonQuery } from '@/api/endpoints/lessons';
import { BlockRenderer } from '@/shared/components/content-block-parser/content-block-parser';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Heading, Text } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { routes } from '@/shared/constants';
import { constants } from './constants';

interface LessonItemPageProps {
  lessonId: string;
  moduleId: string;
}

export const LessonItemPage: React.FC<LessonItemPageProps> = ({ lessonId, moduleId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { breadcrumbs } = constants;

  const { data: lesson, isLoading } = useGetLessonQuery(lessonId);

  if (isLoading) return <FullscreenLoader />;

  if (!lesson) return null;

  const { sequenceOrder, moduleSequenceOrder, contentBlocks, testQuestions } = lesson;
  const handleNavigate = (path: string) => () => {
    router.push(`${pathname}/${path}`);
  };

  console.log(lesson);
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={breadcrumbs(moduleSequenceOrder ?? 1, moduleId, sequenceOrder ?? 0)}
        rootHref={routes.user.modules}
        rootLabel="Структура обучения"
        className="mb-0"
      />

      {contentBlocks?.length > 0 && (
        <CardWrapper>
          {contentBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </CardWrapper>
      )}

      <CardWrapper>
        <Heading variant="2xl" className="mb-4">
          Личный ИИ-помощник
        </Heading>
        <Text variant="l" className="mb-6">
          ИИ-помощник ответит на все вопросы по пройденному материалу. Он поможет тебе лучше понять
          тему, запомнить ключевые моменты и структурировать знания.
        </Text>
        <Button onClick={handleNavigate('retelling')} size="medium">
          Задать вопрос
        </Button>
      </CardWrapper>

      <CardWrapper>
        <Heading variant="2xl" className="mb-4">
          Проверь свои знания
        </Heading>
        <Text variant="l" className="mb-4">
          Пройдите короткий тест, чтобы закрепить материал и проверить понимание темы. Не спешите —
          отвечайте вдумчиво, ведь именно сейчас вы формируете прочную основу для успешного
          прохождения собеседований.
        </Text>
        <DotTitle
          firstLabel={`📋 ${testQuestions ?? 0} вопросов`}
          secondLabel="⏱ 15 минут"
          firstVariant="m"
          secondVariant="m"
          dotClassName="w-1 h-1"
          className="text-medium mb-6"
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button onClick={handleNavigate('test')} size="medium">
            Начать
          </Button>
          <Button onClick={handleNavigate('result')} size="medium">
            Результат
          </Button>
        </div>
      </CardWrapper>
    </div>
  );
};
