'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} from '@/api/endpoints/admin';
import { ILesson } from '@/api/endpoints/lessons';
import { useGetModuleQuery } from '@/api/endpoints/modules';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/Dialog';
import DotTitle from '@/components/DotTitle';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import Input from '@/components/Input';
import LessonCard from '@/components/LessonCard';
import ProgressBar from '@/components/Progress';
import Textarea from '@/components/Textarea';
import { showToast } from '@/components/Toaster';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { useTranslation } from '@/hooks';
import { percentage, pluralize } from '@/lib/utils';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { createBreadcrumbs, examAvailableNumber } from './const';
import { ModuleItemPagePropsType } from './typings';

import {
  BlueButtonSmall,
  CardWrapperContainer,
  DialogContentWrapper,
  DialogFooterWrapper,
  ExamActionsContainer,
  ExamStatusContainer,
  FormContainer,
  LessonActions,
  LessonListItem,
  LessonsList,
  ModuleInfoWrapper,
  ModuleTitleWrapper,
  ProgressText,
  StyledCreateButton,
  StyledLink,
  StyledLinkButton,
  StyledStartButton,
  TitleSection,
  WhiteButton,
  YellowButton,
} from './styles';

const ModuleItemPage: FC<ModuleItemPagePropsType> = (props) => {
  const { id } = props;

  const { t } = useTranslation();

  const pathname = usePathname();
  const router = useRouter();

  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.Mentor;

  const breadcrumbs = createBreadcrumbs(t);

  const {
    data: module,
    isLoading,
    isError,
    refetch,
  } = useGetModuleQuery({ courseId: 1, moduleId: +id });

  const [createLesson] = useCreateLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteLesson] = useDeleteLessonMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  if (isLoading) return <FullscreenLoader />;

  if (isError || !module) return <ErrorSection reset={refetch} />;

  const { totalLessons, completedLessons, title: moduleTitle, sequenceOrder } = module.moduleInfo;
  const { lessons } = module;
  const progress = percentage(totalLessons, completedLessons);

  const handleLessonCardClick = (lessonId: number) => {
    router.push(`${pathname}/${lessonId}`);
  };

  const openCreateModal = () => {
    setEditingLessonId(null);
    setTitle('');
    setDescription('');
    setContent('');
    setModalOpen(true);
  };

  const openEditModal = (lesson: ILesson) => {
    setEditingLessonId(lesson.id);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setContent(lesson.content || '');
    setModalOpen(true);
  };

  const handleSaveLesson = async () => {
    try {
      if (editingLessonId) {
        await updateLesson({
          id: editingLessonId,
          data: {
            moduleId: +id,
            title,
            description,
            content,
            contentBlocks: null,
          },
        }).unwrap();
      } else {
        await createLesson({
          moduleId: +id,
          title,
          description,
          content,
          contentBlocks: null,
        }).unwrap();
      }

      setModalOpen(false);
      refetch();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('COMMON.SAVE_ERROR'));
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await deleteLesson(lessonId).unwrap();
      refetch();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('COMMON.DELETE_ERROR'));
    }
  };

  const isAvailableExam = (progressValue: number) => progressValue >= examAvailableNumber;

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs(sequenceOrder)}
        rootHref={routes.user.modules}
        rootLabel={t('MODULES.STRUCTURE')}
      />

      <CardWrapper>
        <CardWrapperContainer>
          <TitleSection>
            <ModuleTitleWrapper>
              <DotTitle
                heading
                firstLabel={`${t('COMMON.MODULE')} ${sequenceOrder}`}
                secondLabel={moduleTitle}
                firstClassName="module-title-first"
                secondClassName="module-title-second"
              />
            </ModuleTitleWrapper>
            <ModuleInfoWrapper>
              <DotTitle
                firstVariant="m"
                firstLabel={pluralize(
                  totalLessons,
                  t('LESSON.ONE'),
                  t('LESSON.FEW'),
                  t('LESSON.MANY'),
                )}
                secondLabel={pluralize(
                  totalLessons * 2,
                  t('TEST.ONE'),
                  t('TEST.FEW'),
                  t('TEST.MANY'),
                )}
              />
            </ModuleInfoWrapper>
          </TitleSection>

          {isMentor && (
            <StyledCreateButton onClick={openCreateModal}>
              {t('COMMON.ADD_LESSON')}
            </StyledCreateButton>
          )}

          <LessonsList>
            {lessons
              .slice()
              .sort((a, b) => a.sequenceOrder - b.sequenceOrder)
              .map((lesson: ILesson) => (
                <LessonListItem key={lesson.id}>
                  <LessonCard onClick={handleLessonCardClick} {...lesson} />
                  {isMentor && (
                    <LessonActions>
                      <YellowButton onClick={() => openEditModal(lesson)}>
                        {t('COMMON.EDIT')}
                      </YellowButton>
                      <WhiteButton onClick={() => handleDeleteLesson(lesson.id)}>
                        {t('COMMON.DELETE')}
                      </WhiteButton>
                    </LessonActions>
                  )}
                </LessonListItem>
              ))}
          </LessonsList>

          <ExamStatusContainer>
            {isAvailableExam(progress) ? (
              <>
                <Image
                  src="/images/check-icon.svg"
                  alt="Check icon"
                  width={18}
                  height={13}
                  style={{ color: '#238BA7' }}
                />
                <Text variant="l">
                  {t('COMMON.MODULE_COMPLETED')}{' '}
                  <StyledLink href={routes.user.exams}>{t('COMMON.EXAM')}</StyledLink>
                </Text>
              </>
            ) : (
              <>
                <Image src="/images/lock-color-icon.svg" alt="Lock icon" width={19} height={21} />
                <Text variant="l">
                  {t('COMMON.EXAM_LOCKED')}{' '}
                  <StyledLink href={routes.user.exams}>{t('COMMON.EXAM')}</StyledLink>
                </Text>
              </>
            )}
          </ExamStatusContainer>
          <ExamActionsContainer>
            <StyledLinkButton href={routes.user.exams}>
              <StyledStartButton disabled={!isAvailableExam(progress)}>
                {t('COMMON.START_EXAM')}
              </StyledStartButton>
            </StyledLinkButton>
            <ProgressBar strokeWidth={6} size={27} value={progress} variant="circular" />
            <ProgressText variant="l">{progress}%</ProgressText>
          </ExamActionsContainer>
        </CardWrapperContainer>
      </CardWrapper>

      {modalOpen && (
        <DialogContentWrapper>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLessonId ? t('COMMON.EDIT_LESSON') : t('COMMON.CREATE_LESSON')}
                </DialogTitle>
              </DialogHeader>

              <FormContainer>
                <Input
                  placeholder={t('COMMON.LESSON_TITLE')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                  placeholder={t('COMMON.LESSON_DESCRIPTION')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Textarea
                  placeholder={t('COMMON.LESSON_CONTENT')}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormContainer>

              <DialogFooterWrapper>
                <DialogFooter>
                  <WhiteButton onClick={() => setModalOpen(false)}>
                    {t('COMMON.CANCEL')}
                  </WhiteButton>
                  <BlueButtonSmall onClick={handleSaveLesson}>
                    {editingLessonId ? t('COMMON.SAVE') : t('COMMON.CREATE')}
                  </BlueButtonSmall>
                </DialogFooter>
              </DialogFooterWrapper>
            </DialogContent>
          </Dialog>
        </DialogContentWrapper>
      )}
    </>
  );
};

export default ModuleItemPage;
