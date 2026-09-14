'use client';

import { useState, type ChangeEvent, type FC } from 'react';

import { useCreateTestMutation, useUpdateTestMutation } from '@/api/endpoints/test';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { showToast } from '@/components/Toaster';
import { useTranslation } from '@/hooks';
import { getServerErrorMessage } from '@/lib/utils';

import { DEFAULT_PASS_THRESHOLD, EMPTY_QUESTION, TestFormMode } from './const';
import { type ITestBuilderProps, type TestFormQuestionType } from './typings';

import {
  ActionWrapper,
  ButtonsFooter,
  ButtonsRow,
  FormContainer,
  QuestionRow,
  QuestionRowHeader,
  SectionHeading,
  SectionText,
  SectionTextSmall,
} from './styles';

const TestBuilder: FC<ITestBuilderProps> = (props) => {
  const {
    testType,
    moduleId,
    lessonId,
    existingTest,
    isLoading,
    sectionTitle,
    emptyMessage,
    createButtonLabel,
    editButtonLabel,
  } = props;

  const { t } = useTranslation();

  const [createTest] = useCreateTestMutation();
  const [updateTest] = useUpdateTestMutation();

  const [formMode, setFormMode] = useState<TestFormMode | null>(null);
  const [title, setTitle] = useState('');
  const [passThreshold, setPassThreshold] = useState(DEFAULT_PASS_THRESHOLD);
  const [questions, setQuestions] = useState<TestFormQuestionType[]>([{ ...EMPTY_QUESTION }]);
  const [errors, setErrors] = useState<{
    title?: string;
    threshold?: string;
    questions: Record<number, string>;
  }>({ questions: {} });

  const openCreateForm = () => {
    setTitle('');
    setPassThreshold(DEFAULT_PASS_THRESHOLD);
    setQuestions([{ ...EMPTY_QUESTION }]);
    setErrors({ questions: {} });
    setFormMode(TestFormMode.Create);
  };

  const openEditForm = () => {
    if (!existingTest) return;

    setTitle(existingTest.title);
    setPassThreshold(existingTest.passThresholdPercentage);
    setQuestions(
      existingTest.questions.length > 0
        ? existingTest.questions.map((q) => ({ text: q.text, maxScore: q.maxScore ?? 1 }))
        : [{ ...EMPTY_QUESTION }],
    );
    setErrors({ questions: {} });
    setFormMode(TestFormMode.Edit);
  };

  const closeForm = () => {
    setFormMode(null);
    setErrors({ questions: {} });
  };

  const addQuestion = () => setQuestions((prev) => [...prev, { ...EMPTY_QUESTION }]);

  const removeQuestion = (index: number) => () =>
    setQuestions((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

  const handleQuestionTextChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, text: value } : q)));
    setErrors((prev) => {
      const nextQuestions = { ...prev.questions };
      delete nextQuestions[index];

      return { ...prev, questions: nextQuestions };
    });
  };

  const handleQuestionMaxScoreChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const maxScore = Number(e.target.value) || 0;

    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, maxScore } : q)));
  };

  const handleSave = async () => {
    const questionErrors: Record<number, string> = {};

    questions.forEach((q, index) => {
      if (!q.text.trim()) questionErrors[index] = t('VALIDATION.REQUIRED_QUESTION_TEXT');
      else if (!Number.isFinite(q.maxScore) || q.maxScore < 1)
        questionErrors[index] = t('VALIDATION.INVALID_MAX_SCORE');
    });

    const nextErrors = {
      title: title.trim().length < 3 ? t('VALIDATION.TEST_TITLE_MIN_3') : undefined,
      threshold:
        !Number.isFinite(passThreshold) || passThreshold < 0 || passThreshold > 100
          ? t('VALIDATION.INVALID_THRESHOLD')
          : undefined,
      questions: questionErrors,
    };

    setErrors(nextErrors);

    if (nextErrors.title || nextErrors.threshold || Object.keys(questionErrors).length > 0) return;

    const body = {
      testType,
      moduleId,
      ...(lessonId ? { lessonId } : {}),
      title,
      passThresholdPercentage: passThreshold,
      questions: questions.map((q, i) => ({
        text: q.text,
        sequenceOrder: i,
        maxScore: q.maxScore,
      })),
    };

    try {
      if (formMode === TestFormMode.Create) {
        await createTest(body).unwrap();
        showToast(
          'success',
          t('LESSON_ITEM_PAGE.TOAST_SUCCESS_TITLE'),
          t('LESSON_ITEM_PAGE.TEST_CREATE_SUCCESS'),
        );
      } else if (formMode === TestFormMode.Edit && existingTest) {
        await updateTest({ id: existingTest.id, data: body }).unwrap();
        showToast(
          'success',
          t('LESSON_ITEM_PAGE.TOAST_SUCCESS_TITLE'),
          t('LESSON_ITEM_PAGE.TEST_UPDATE_SUCCESS'),
        );
      }

      closeForm();
    } catch (error) {
      showToast(
        'error',
        t('LESSON_ITEM_PAGE.TOAST_ERROR_TITLE'),
        getServerErrorMessage(error) || t('LESSON_ITEM_PAGE.TEST_ERROR'),
      );
    }
  };

  if (isLoading) return null;

  return (
    <>
      <SectionHeading variant="2xl">{sectionTitle}</SectionHeading>

      {!formMode &&
        (existingTest ? (
          <>
            <SectionTextSmall variant="l">
              {existingTest.title} — {existingTest.questions.length}{' '}
              {t('LESSON_ITEM_PAGE.TEST_QUESTIONS_LABEL')},{' '}
              {t('LESSON_ITEM_PAGE.TEST_PASS_THRESHOLD_LABEL')}:{' '}
              {existingTest.passThresholdPercentage}%
            </SectionTextSmall>
            <ActionWrapper>
              <Button variant="yellow" size="small" onClick={openEditForm}>
                {editButtonLabel}
              </Button>
            </ActionWrapper>
          </>
        ) : (
          <>
            <SectionTextSmall variant="l">{emptyMessage}</SectionTextSmall>
            <ActionWrapper>
              <Button variant="blue" size="small" onClick={openCreateForm}>
                {createButtonLabel}
              </Button>
            </ActionWrapper>
          </>
        ))}

      {formMode && (
        <FormContainer>
          <Input
            label={t('LESSON_ITEM_PAGE.TEST_TITLE_LABEL')}
            placeholder={t('LESSON_ITEM_PAGE.TEST_TITLE_LABEL')}
            value={title}
            error={errors.title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
          />
          <Input
            type="number"
            label={t('LESSON_ITEM_PAGE.TEST_PASS_THRESHOLD_LABEL')}
            value={passThreshold}
            error={errors.threshold}
            min={0}
            max={100}
            onChange={(e) => {
              setPassThreshold(Number(e.target.value) || 0);
              setErrors((prev) => ({ ...prev, threshold: undefined }));
            }}
          />

          <SectionText variant="m-bold">{t('LESSON_ITEM_PAGE.TEST_QUESTIONS_HEADING')}</SectionText>

          {questions.map((q, index) => (
            <QuestionRow key={index}>
              <QuestionRowHeader>
                <SectionTextSmall variant="s">
                  {t('LESSON_ITEM_PAGE.TEST_QUESTIONS_HEADING')} {index + 1}
                </SectionTextSmall>
                <Button
                  variant="white"
                  size="small"
                  onClick={removeQuestion(index)}
                  disabled={questions.length <= 1}
                >
                  {t('LESSON_ITEM_PAGE.TEST_REMOVE_QUESTION')}
                </Button>
              </QuestionRowHeader>
              <Input
                placeholder={t('LESSON_ITEM_PAGE.TEST_QUESTION_TEXT_PLACEHOLDER')}
                value={q.text}
                error={errors.questions[index]}
                onChange={handleQuestionTextChange(index)}
              />
              <Input
                type="number"
                label={t('LESSON_ITEM_PAGE.TEST_QUESTION_MAX_SCORE')}
                value={q.maxScore}
                min={1}
                onChange={handleQuestionMaxScoreChange(index)}
              />
            </QuestionRow>
          ))}

          <ButtonsRow>
            <Button variant="yellow" size="small" onClick={addQuestion}>
              {t('LESSON_ITEM_PAGE.TEST_ADD_QUESTION')}
            </Button>
          </ButtonsRow>

          <ButtonsFooter>
            <Button variant="white" size="small" onClick={closeForm}>
              {t('LESSON_ITEM_PAGE.BUTTON_CANCEL')}
            </Button>
            <Button variant="blue" size="small" onClick={handleSave}>
              {t('LESSON_ITEM_PAGE.TEST_SAVE')}
            </Button>
          </ButtonsFooter>
        </FormContainer>
      )}
    </>
  );
};

export default TestBuilder;
