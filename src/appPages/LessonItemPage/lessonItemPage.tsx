'use client';

import MDEditor from '@uiw/react-md-editor';
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useUpdateLessonContentMarkdownMutation } from '@/api/endpoints/admin';
import { useGetLessonQuery } from '@/api/endpoints/lessons';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { CardWrapper } from '@/components/CardWrapper';
import { BlockRenderer } from '@/components/ContentBlockParser';
import { DotTitle } from '@/components/DotTitle';
import { FullscreenLoader } from '@/components/FullscreenLoader';
import { MarkdownRenderer } from '@/components/MarkdownText';
import Page from '@/components/Page';
import { showToast } from '@/components/Toaster';
import { Heading, Text } from '@/components/Typography';
import { routes } from '@/constants';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { constants } from './constants';
import { ILessonItemPageProps } from './typings';

export const LessonItemPage: FC<ILessonItemPageProps> = (props) => {
  const { lessonId, moduleId } = props;

  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();

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
      showToast(
        'success',
        t('LESSON_ITEM_PAGE.TOAST_SUCCESS_TITLE'),
        t('LESSON_ITEM_PAGE.TOAST_SUCCESS_MESSAGE'),
      );
    } catch {
      showToast(
        'error',
        t('LESSON_ITEM_PAGE.TOAST_ERROR_TITLE'),
        t('LESSON_ITEM_PAGE.TOAST_ERROR_MESSAGE'),
      );
    }
  };

  return (
    <Page noIndex>
      <div className="flex flex-col gap-6">
        <Breadcrumbs
          items={constants.breadcrumbs(t, moduleSequenceOrder ?? 1, moduleId, sequenceOrder ?? 0)}
          rootHref={routes.user.modules}
          rootLabel={t('LESSON_ITEM_PAGE.BREADCRUMB_ROOT')}
          className="mb-0"
        />

        <CardWrapper>
          {isMentor && !editing && (
            <Button variant="yellow" size="small" onClick={handleEdit} className="mb-4">
              {t('LESSON_ITEM_PAGE.BUTTON_EDIT')}
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
                  {t('LESSON_ITEM_PAGE.BUTTON_CANCEL')}
                </Button>
                <Button variant="blue" size="small" onClick={handleSave}>
                  {t('LESSON_ITEM_PAGE.BUTTON_SAVE')}
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
            {t('LESSON_ITEM_PAGE.AI_ASSISTANT_TITLE')}
          </Heading>
          <Text variant="l" className="mb-6">
            {t('LESSON_ITEM_PAGE.AI_ASSISTANT_DESCRIPTION')}
          </Text>
          <Button onClick={() => router.push(routes.user.aiAssistant)} size="medium">
            {t('LESSON_ITEM_PAGE.AI_ASSISTANT_ASK_QUESTION')}
          </Button>
        </CardWrapper>

        <CardWrapper>
          <Heading variant="2xl" className="mb-4">
            {t('LESSON_ITEM_PAGE.CHECK_YOUR_KNOWLEDGE_TITLE')}
          </Heading>
          <Text variant="l" className="mb-4">
            {t('LESSON_ITEM_PAGE.CHECK_YOUR_KNOWLEDGE_DESCRIPTION')}
          </Text>
          <DotTitle
            firstLabel={`📋 ${testQuestions ?? 0} ${t('LESSON_ITEM_PAGE.TEST_QUESTIONS_LABEL')}`}
            secondLabel={t('LESSON_ITEM_PAGE.TEST_TIME_LABEL')}
            firstVariant="m"
            secondVariant="m"
            dotClassName="w-1 h-1"
            className="text-medium mb-6"
          />
          <div className="flex gap-2">
            <Button onClick={handleNavigate('test')} size="medium">
              {t('LESSON_ITEM_PAGE.BUTTON_START')}
            </Button>
            <Button onClick={handleNavigate('result')} size="medium">
              {t('LESSON_ITEM_PAGE.BUTTON_RESULT')}
            </Button>
          </div>
        </CardWrapper>
      </div>
    </Page>
  );
};
