'use client';

import MDEditor from '@uiw/react-md-editor';
import { usePathname, useRouter } from 'next/navigation';
import { type ChangeEvent, type FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useUpdateLessonContentMarkdownMutation } from '@/api/endpoints/admin';
import { useGetLessonQuery } from '@/api/endpoints/lessons';
import {
  useGetTestByLessonIdQuery,
  useCreateLessonTestMutation,
  useUpdateLessonTestMutation,
} from '@/api/endpoints/test';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import BlockRenderer from '@/components/ContentBlockParser';
import DotTitle from '@/components/DotTitle';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import Input from '@/components/Input';
import { showToast } from '@/components/Toaster';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { constants } from './const';
import { type ILessonItemPageProps, TestFormMode } from './typings';

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
  TestFormContainer,
  TestInfoDotTitleWrapper,
  LessonMarkdownContent,
  TestQuestionRow,
  TestQuestionRowHeader,
  WhiteButton,
  YellowButton,
} from './styles';

const LessonItemPage: FC<ILessonItemPageProps> = (props) => {
  const { lessonId, moduleId, courseId } = props;

  const { t } = useTranslation();

  const router = useRouter();
  const pathname = usePathname();

  const { data: lesson, isLoading, refetch } = useGetLessonQuery(lessonId);
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.Mentor;

  const { data: lessonTest, isLoading: isTestLoading } = useGetTestByLessonIdQuery(
    Number(lessonId),
    {
      skip: !lessonId,
    },
  );
  const [createLessonTest] = useCreateLessonTestMutation();
  const [updateLessonTest] = useUpdateLessonTestMutation();

  const [updateContent] = useUpdateLessonContentMarkdownMutation();

  const [editing, setEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  type TestFormQuestion = { text: string; maxScore: number };
  const [testFormMode, setTestFormMode] = useState<null | TestFormMode>(null);
  const [testTitle, setTestTitle] = useState('');
  const [testPassThreshold, setTestPassThreshold] = useState(70);
  const [formQuestions, setFormQuestions] = useState<TestFormQuestion[]>([
    { text: '', maxScore: 1 },
  ]);

  useEffect(() => {
    if (lesson?.content) {
      setMarkdownContent(lesson.content);
    }
  }, [lesson]);

  if (isLoading) return <FullscreenLoader />;

  if (!lesson) return <ErrorSection reset={refetch} />;

  const { sequenceOrder, moduleSequenceOrder, contentBlocks, testQuestions } = lesson;

  const handleNavigate = (path: string) => () => router.push(`${pathname}/${path}`);
  const handleEdit = () => setEditing(true);
  const handleCancel = () => setEditing(false);

  const openTestCreateForm = () => {
    setTestTitle('');
    setTestPassThreshold(70);
    setFormQuestions([{ text: '', maxScore: 1 }]);
    setTestFormMode(TestFormMode.Create);
  };
  const openTestEditForm = () => {
    if (lessonTest) {
      setTestTitle(lessonTest.title);
      setTestPassThreshold(lessonTest.passThresholdPercentage);
      setFormQuestions(
        lessonTest.questions.length > 0
          ? lessonTest.questions.map((q) => ({ text: q.text, maxScore: q.maxScore ?? 1 }))
          : [{ text: '', maxScore: 1 }],
      );
      setTestFormMode(TestFormMode.Edit);
    }
  };
  const closeTestForm = () => setTestFormMode(null);
  const addTestQuestion = () => setFormQuestions((prev) => [...prev, { text: '', maxScore: 1 }]);
  const removeTestQuestion = (index: number) =>
    setFormQuestions((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));
  const onClick = (index: number) => () => removeTestQuestion(index);
  const updateTestQuestion = (index: number, field: 'text' | 'maxScore', value: string | number) =>
    setFormQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, [field]: field === 'maxScore' ? Number(value) || 0 : value } : q,
      ),
    );
  const handleQuestionTextChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) =>
    updateTestQuestion(index, 'text', e.target.value);
  const handleQuestionMaxScoreChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) =>
    updateTestQuestion(index, 'maxScore', e.target.value);

  const handleSaveTest = async () => {
    const body = {
      testType: 'LESSON_TEST' as const,
      lessonId: Number(lessonId),
      moduleId: Number(moduleId),
      title: testTitle,
      passThresholdPercentage: testPassThreshold,
      questions: formQuestions.map((q, i) => ({
        text: q.text,
        sequenceOrder: i,
        maxScore: q.maxScore,
      })),
    };
    try {
      if (testFormMode === TestFormMode.Create) {
        await createLessonTest(body).unwrap();
        showToast(
          'success',
          t('LESSON_ITEM_PAGE.TOAST_SUCCESS_TITLE'),
          t('LESSON_ITEM_PAGE.TEST_CREATE_SUCCESS'),
        );
      } else if (testFormMode === TestFormMode.Edit && lessonTest) {
        await updateLessonTest({ id: lessonTest.id, data: body }).unwrap();
        showToast(
          'success',
          t('LESSON_ITEM_PAGE.TOAST_SUCCESS_TITLE'),
          t('LESSON_ITEM_PAGE.TEST_UPDATE_SUCCESS'),
        );
      }

      closeTestForm();
    } catch {
      showToast('error', t('LESSON_ITEM_PAGE.TOAST_ERROR_TITLE'), t('LESSON_ITEM_PAGE.TEST_ERROR'));
    }
  };

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
          items={constants.breadcrumbs(
            t,
            moduleSequenceOrder ?? 1,
            moduleId,
            sequenceOrder ?? 0,
            courseId,
          )}
          rootHref={
            courseId != null ? `${ROUTES.USER_COURSES}/${courseId}/modules` : ROUTES.USER_MODULES
          }
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
                  onChange={(val) => setMarkdownContent(val ?? '')}
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

      {lesson.content && (
        <CardWrapper>
          <LessonMarkdownContent data-color-mode="light">
            <MDEditor.Markdown source={lesson.content} />
          </LessonMarkdownContent>
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
        <BlueButtonMedium onClick={() => router.push(ROUTES.USER_AI_ASSISTANT)}>
          {t('LESSON_ITEM_PAGE.AI_ASSISTANT_ASK_QUESTION')}
        </BlueButtonMedium>
      </CardWrapper>

      {isMentor && !isTestLoading && (
        <CardWrapper>
          <SectionHeading variant="2xl">{t('LESSON_ITEM_PAGE.TEST_SECTION_TITLE')}</SectionHeading>
          {!testFormMode &&
            (lessonTest ? (
              <>
                <SectionTextSmall variant="l">
                  {lessonTest.title} — {lessonTest.questions.length}{' '}
                  {t('LESSON_ITEM_PAGE.TEST_QUESTIONS_LABEL')},{' '}
                  {t('LESSON_ITEM_PAGE.TEST_PASS_THRESHOLD_LABEL')}:{' '}
                  {lessonTest.passThresholdPercentage}%
                </SectionTextSmall>
                <EditButtonWrapper>
                  <YellowButton onClick={openTestEditForm}>
                    {t('LESSON_ITEM_PAGE.TEST_EDIT_BUTTON')}
                  </YellowButton>
                </EditButtonWrapper>
              </>
            ) : (
              <>
                <SectionTextSmall variant="l">
                  {t('LESSON_ITEM_PAGE.TEST_NO_TEST_MESSAGE')}
                </SectionTextSmall>
                <EditButtonWrapper>
                  <BlueButtonMedium onClick={openTestCreateForm}>
                    {t('LESSON_ITEM_PAGE.TEST_CREATE_BUTTON')}
                  </BlueButtonMedium>
                </EditButtonWrapper>
              </>
            ))}
          {testFormMode && (
            <TestFormContainer>
              <Input
                label={t('LESSON_ITEM_PAGE.TEST_TITLE_LABEL')}
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                placeholder={t('LESSON_ITEM_PAGE.TEST_TITLE_LABEL')}
              />
              <Input
                type="number"
                label={t('LESSON_ITEM_PAGE.TEST_PASS_THRESHOLD_LABEL')}
                value={testPassThreshold}
                onChange={(e) => setTestPassThreshold(Number(e.target.value) || 0)}
                min={0}
                max={100}
              />
              <SectionText variant="m-bold">
                {t('LESSON_ITEM_PAGE.TEST_QUESTIONS_HEADING')}
              </SectionText>
              {formQuestions.map((q, index) => (
                <TestQuestionRow key={index}>
                  <TestQuestionRowHeader>
                    <SectionTextSmall variant="s">
                      {t('LESSON_ITEM_PAGE.TEST_QUESTIONS_HEADING')} {index + 1}
                    </SectionTextSmall>
                    <WhiteButton
                      size="small"
                      onClick={onClick(index)}
                      disabled={formQuestions.length <= 1}
                    >
                      {t('LESSON_ITEM_PAGE.TEST_REMOVE_QUESTION')}
                    </WhiteButton>
                  </TestQuestionRowHeader>
                  <Input
                    placeholder={t('LESSON_ITEM_PAGE.TEST_QUESTION_TEXT_PLACEHOLDER')}
                    value={q.text}
                    onChange={handleQuestionTextChange(index)}
                  />
                  <Input
                    type="number"
                    label={t('LESSON_ITEM_PAGE.TEST_QUESTION_MAX_SCORE')}
                    value={q.maxScore}
                    onChange={handleQuestionMaxScoreChange(index)}
                    min={1}
                  />
                </TestQuestionRow>
              ))}
              <ButtonsRow>
                <YellowButton onClick={addTestQuestion}>
                  {t('LESSON_ITEM_PAGE.TEST_ADD_QUESTION')}
                </YellowButton>
              </ButtonsRow>
              <ButtonsContainer>
                <WhiteButton onClick={closeTestForm}>
                  {t('LESSON_ITEM_PAGE.BUTTON_CANCEL')}
                </WhiteButton>
                <BlueButtonSmall onClick={handleSaveTest}>
                  {t('LESSON_ITEM_PAGE.TEST_SAVE')}
                </BlueButtonSmall>
              </ButtonsContainer>
            </TestFormContainer>
          )}
        </CardWrapper>
      )}

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
