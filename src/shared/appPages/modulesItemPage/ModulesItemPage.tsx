'use client';

import { CardWrapper } from '@/shared/components/cardWrapper';
import { routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { DotTitle } from '@/shared/ui/DotTitle';
import { CheckIcon, LockColorIcon } from '@/shared/ui/icons';
import { ProgressBar } from '@/shared/ui/Progress';
import { Text } from '@/shared/ui/Typography';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { constants } from './constants';
import { LessonCard } from '@/shared/components/lessonCard';
import { useGetModuleQuery } from '@/api/endpoints/modules/modules';
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} from '@/api/endpoints/admin';
import { FullscreenLoader } from '@/shared/components/fullscreenLoader/FullscreenLoader';
import { ErrorSection } from '@/shared/components/errorSection';
import { percentage, pluralize } from '@/shared/lib/utils';
import { ILesson } from '@/api/endpoints/lessons/types';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';
import { showToast } from '@/shared/ui/Toaster';
import { ModuleItemPagePropsType } from './typings';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/Dialog';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';
import { Input } from '@/shared/ui/Input';
import { useTranslation } from 'react-i18next';
import Page from '@/shared/components/page';

export const ModuleItemPage: FC<ModuleItemPagePropsType> = (props) => {
  const { id } = props;

  const { t } = useTranslation();

  const pathname = usePathname();
  const router = useRouter();

  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.MENTOR;

  const { breadcrumbs, examAvailableNumber } = constants;

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
  const lessons = module.lessons;
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
    <Page noIndex>
      <Breadcrumbs
        items={breadcrumbs(sequenceOrder)}
        rootHref={routes.user.modules}
        rootLabel={t('MODULES.STRUCTURE')}
      />

      <CardWrapper className="flex flex-col gap-5">
        <div className="space-y-1">
          <DotTitle
            heading
            firstClassName="text-[24px]"
            secondClassName="text-[24px]"
            firstLabel={`${t('COMMON.MODULE')} ${sequenceOrder}`}
            secondLabel={moduleTitle}
            dotClassName="min-w-[6px] min-h-[6px] self-center !m-0"
          />
          <DotTitle
            firstClassName="text-soft"
            secondClassName="text-soft"
            firstVariant="m"
            dotClassName="bg-soft"
            firstLabel={pluralize(totalLessons, t('LESSON.ONE'), t('LESSON.FEW'), t('LESSON.MANY'))}
            secondLabel={pluralize(totalLessons * 2, t('TEST.ONE'), t('TEST.FEW'), t('TEST.MANY'))}
          />
        </div>

        {isMentor && (
          <Button className="text-[16px]" variant="blue" size="small" onClick={openCreateModal}>
            {t('ADD_LESSON')}
          </Button>
        )}

        <ul className="mt-3 space-y-3">
          {lessons.map((lesson: ILesson, index) => (
            <li key={lesson.id} className="relative">
              <LessonCard onClick={handleLessonCardClick} index={index} {...lesson} />
              {isMentor && (
                <div className="mt-2 flex gap-2">
                  <Button variant="yellow" size="small" onClick={() => openEditModal(lesson)}>
                    {t('COMMON.EDIT')}
                  </Button>
                  <Button
                    variant="white"
                    size="small"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    {t('COMMON.DELETE')}
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isAvailableExam(progress) ? (
            <>
              <CheckIcon color="blue" />
              <Text variant={'l'}>
                {t('COMMON.MODULE_COMPLETED')}{' '}
                <Link className="text-medium !underline" href={routes.user.exams}>
                  {t('COMMON.EXAM')}
                </Link>
              </Text>
            </>
          ) : (
            <>
              <LockColorIcon />
              <Text variant={'l'}>
                {t('COMMON.EXAM_LOCKED')}{' '}
                <Link className="text-medium !underline" href={routes.user.exams}>
                  {t('COMMON.EXAM')}
                </Link>
              </Text>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link className="text-medium" href={routes.user.exams}>
            <Button disabled={!isAvailableExam(progress)} className="mr-2">
              {t('COMMON.START_EXAM')}
            </Button>
          </Link>
          <ProgressBar strokeWidth={6} size={27} value={progress} variant="circular" />
          <Text variant={'l'} className="font-montserrat text-medium font-semibold">
            {progress}%
          </Text>
        </div>
      </CardWrapper>

      {modalOpen && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingLessonId ? t('COMMON.EDIT_LESSON') : t('COMMON.CREATE_LESSON')}
              </DialogTitle>
            </DialogHeader>

            <Input
              className="mt-2 w-full"
              placeholder={t('COMMON.LESSON_TITLE')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              className="mt-2"
              placeholder={t('COMMON.LESSON_DESCRIPTION')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Textarea
              className="mt-2"
              placeholder={t('COMMON.LESSON_CONTENT')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="white" size="small" onClick={() => setModalOpen(false)}>
                {t('COMMON.CANCEL')}
              </Button>
              <Button variant="blue" size="small" onClick={handleSaveLesson}>
                {editingLessonId ? t('COMMON.SAVE') : t('COMMON.CREATE')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Page>
  );
};
