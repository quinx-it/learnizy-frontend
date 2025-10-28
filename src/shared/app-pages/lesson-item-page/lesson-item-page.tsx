'use client';

import React, { FC, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import MDEditor from '@uiw/react-md-editor';
import { useGetLessonQuery } from '@/api/endpoints/lessons';
import { useUpdateLessonContentMarkdownMutation } from '@/api/endpoints/admin';
import { BlockRenderer } from '@/shared/components/content-block-parser/content-block-parser';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Heading, Text } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { MarkdownRenderer } from '@/shared/components/markdown-text';
import { routes } from '@/shared/constants';
import { constants } from './constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/types';
import { showToast } from '@/shared/ui/toaster';

interface ILessonItemPageProps {
  lessonId: string;
  moduleId: string;
}

export const LessonItemPage: FC<ILessonItemPageProps> = (props) => {
  const { lessonId, moduleId } = props;

  const router = useRouter();
  const pathname = usePathname();
  const { breadcrumbs } = constants;

  const { data: lesson, isLoading } = useGetLessonQuery(lessonId);
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.MENTOR;

  const [updateContent] = useUpdateLessonContentMarkdownMutation();

  const [editing, setEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    if (lesson?.content) {
      setMarkdownContent(lesson.content);
    }
  }, [lesson]);

  if (isLoading) return <FullscreenLoader />;

  if (!lesson) return null;

  const { sequenceOrder, moduleSequenceOrder, contentBlocks, testQuestions } = lesson;

  const handleNavigate = (path: string) => () => router.push(`${pathname}/${path}`);
  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);
  const handleSave = async () => {
    try {
      await updateContent({
        lessonId: Number(lessonId),
        data: { content: markdownContent },
      }).unwrap();

      setEditing(false);
      showToast('success', 'Успех', 'Контент успешно сохранён');
    } catch (error) {
      showToast('error', 'Ошибка', 'Ошибка при сохранении контента');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={breadcrumbs(moduleSequenceOrder ?? 1, moduleId, sequenceOrder ?? 0)}
        rootHref={routes.user.modules}
        rootLabel="Структура обучения"
        className="mb-0"
      />

      <CardWrapper>
        {isMentor && !editing && (
          <Button variant="yellow" size="small" onClick={handleEdit} className="mb-4">
            Изменить
          </Button>
        )}
        {editing ? (
          <div className="flex flex-col gap-4">
            <div data-color-mode="light" className="wmde-markdown-light">
              <MDEditor
                value={markdownContent}
                onChange={(val) => setMarkdownContent(val || '')}
                height={400}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="white" size="small" onClick={handleCancel}>
                Отмена
              </Button>
              <Button variant="blue" size="small" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-full break-words">
            <MarkdownRenderer text={markdownContent} className="lesson-markdown" />
          </div>
        )}
      </CardWrapper>

      {lesson.contentBlocks?.length > 0 && (
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
        <Button onClick={() => router.push(routes.user.aiAssistant)} size="medium">
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
        <div className="flex gap-2">
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
