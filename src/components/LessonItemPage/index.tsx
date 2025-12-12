'use client';

import MDEditor from '@uiw/react-md-editor';
import { usePathname, useRouter } from 'next/navigation';
import { type FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useUpdateLessonContentMarkdownMutation } from '@/api/endpoints/admin';
import { useGetLessonQuery } from '@/api/endpoints/lessons';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import BlockRenderer from '@/components/ContentBlockParser';
import DotTitle from '@/components/DotTitle';
import FullscreenLoader from '@/components/FullscreenLoader';
import { showToast } from '@/components/Toaster';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { constants } from './const';
import { type ILessonItemPageProps } from './typings';

import {
  BlueButtonMedium,
  BlueButtonSmall,
  BreadcrumbsWrapper,
  ButtonsContainer,
  ButtonsRow,
  Container,
  EditButtonWrapper,
  EditingContainer,
  EditorWrapper,
  SectionHeading,
  SectionText,
  SectionTextSmall,
  TestInfoDotTitleWrapper,
  WhiteButton,
  YellowButton,
} from './styles';

const LessonItemPage: FC<ILessonItemPageProps> = (props) => {
  const { lessonId, moduleId } = props;

  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();

  const { data: lesson, isLoading } = useGetLessonQuery(lessonId);
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.Mentor;

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
    <Container>
      <BreadcrumbsWrapper>
        <Breadcrumbs
          items={constants.breadcrumbs(t, moduleSequenceOrder ?? 1, moduleId, sequenceOrder ?? 0)}
          rootHref={routes.user.modules}
          rootLabel={t('LESSON_ITEM_PAGE.BREADCRUMB_ROOT')}
        />
      </BreadcrumbsWrapper>

      {isMentor && (
        <CardWrapper>
          {!editing && (
            <EditButtonWrapper>
              <YellowButton onClick={handleEdit}>{t('LESSON_ITEM_PAGE.BUTTON_EDIT')}</YellowButton>
            </EditButtonWrapper>
          )}
          {editing && (
            <EditingContainer>
              <EditorWrapper data-color-mode="light">
                <MDEditor
                  value={markdownContent}
                  onChange={(val) => setMarkdownContent(val || '')}
                  height={400}
                />
              </EditorWrapper>
              <ButtonsContainer>
                <WhiteButton onClick={handleCancel}>
                  {t('LESSON_ITEM_PAGE.BUTTON_CANCEL')}
                </WhiteButton>
                <BlueButtonSmall onClick={handleSave}>
                  {t('LESSON_ITEM_PAGE.BUTTON_SAVE')}
                </BlueButtonSmall>
              </ButtonsContainer>
            </EditingContainer>
          )}
        </CardWrapper>
      )}

      {lesson.contentBlocks?.length > 0 && (
        <CardWrapper>
          {contentBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </CardWrapper>
      )}

      <CardWrapper>
        <SectionHeading variant="2xl">{t('LESSON_ITEM_PAGE.AI_ASSISTANT_TITLE')}</SectionHeading>
        <SectionText variant="l">{t('LESSON_ITEM_PAGE.AI_ASSISTANT_DESCRIPTION')}</SectionText>
        <BlueButtonMedium onClick={() => router.push(routes.user.aiAssistant)}>
          {t('LESSON_ITEM_PAGE.AI_ASSISTANT_ASK_QUESTION')}
        </BlueButtonMedium>
      </CardWrapper>

      <CardWrapper>
        <SectionHeading variant="2xl">
          {t('LESSON_ITEM_PAGE.CHECK_YOUR_KNOWLEDGE_TITLE')}
        </SectionHeading>
        <SectionTextSmall variant="l">
          {t('LESSON_ITEM_PAGE.CHECK_YOUR_KNOWLEDGE_DESCRIPTION')}
        </SectionTextSmall>
        <TestInfoDotTitleWrapper>
          <DotTitle
            firstLabel={`📋 ${testQuestions ?? 0} ${t('LESSON_ITEM_PAGE.TEST_QUESTIONS_LABEL')}`}
            secondLabel={t('LESSON_ITEM_PAGE.TEST_TIME_LABEL')}
            firstVariant="m"
            secondVariant="m"
          />
        </TestInfoDotTitleWrapper>
        <ButtonsRow>
          <BlueButtonMedium onClick={handleNavigate('test')}>
            {t('LESSON_ITEM_PAGE.BUTTON_START')}
          </BlueButtonMedium>
          <BlueButtonMedium onClick={handleNavigate('result')}>
            {t('LESSON_ITEM_PAGE.BUTTON_RESULT')}
          </BlueButtonMedium>
        </ButtonsRow>
      </CardWrapper>
    </Container>
  );
};

export default LessonItemPage;
