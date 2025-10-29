'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Button } from '@/shared/ui/button';
import { DotTitle } from '@/shared/ui/dotTitle';
import { CheckIcon, LockColorIcon } from '@/shared/ui/icons';
import { ProgressBar } from '@/shared/ui/progress';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { constants } from './constants';
import { LessonCard } from '@/shared/components/lesson-card';
import { useGetModuleQuery } from '@/api/endpoints/modules/modules';
import {
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} from '@/api/endpoints/admin';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';
import { percentage, pluralize } from '@/shared/lib/utils';
import { ILesson } from '@/api/endpoints/lessons/types';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';
import { showToast } from '@/shared/ui/toaster';
import { ModuleItemPagePropsType } from './typings';

export const ModuleItemPage: FC<ModuleItemPagePropsType> = (props) => {
  const { id } = props;

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
      showToast('error', 'Ошибка', 'Ошибка при сохранении урока');
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await deleteLesson(lessonId).unwrap();
      refetch();
    } catch {
      showToast('error', 'Ошибка', 'Ошибка при удалении урока');
    }
  };

  const isAvailableExam = (progressValue: number) => progressValue >= examAvailableNumber;

  return (
    <>
      <Breadcrumbs
        items={breadcrumbs(sequenceOrder)}
        rootHref={routes.user.modules}
        rootLabel={'Структура обучения'}
      />

      <CardWrapper className="flex flex-col gap-5">
        <div className="space-y-1">
          <DotTitle
            heading
            firstClassName="text-[24px]"
            secondClassName="text-[24px]"
            firstLabel={`Модуль ${sequenceOrder}`}
            secondLabel={moduleTitle}
            dotClassName="min-w-[6px] min-h-[6px] self-center !m-0"
          />
          <DotTitle
            firstClassName="text-soft"
            secondClassName="text-soft"
            firstVariant="m"
            dotClassName="bg-soft"
            firstLabel={pluralize(totalLessons, 'урок', 'урока', 'уроков')}
            secondLabel={pluralize(totalLessons * 2, 'тест', 'теста', 'тестов')}
          />
        </div>

        {isMentor && (
          <Button className="text-[16px]" variant="blue" size="small" onClick={openCreateModal}>
            Добавить урок
          </Button>
        )}

        <ul className="mt-3 space-y-3">
          {lessons.map((lesson: ILesson, index) => (
            <li key={lesson.id} className="relative">
              <LessonCard onClick={handleLessonCardClick} index={index} {...lesson} />
              {isMentor && (
                <div className="mt-2 flex gap-2">
                  <Button variant="yellow" size="small" onClick={() => openEditModal(lesson)}>
                    Редактировать
                  </Button>
                  <Button
                    variant="white"
                    size="small"
                    onClick={() => handleDeleteLesson(lesson.id)}
                  >
                    Удалить
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
                Модуль завершён — самое время пройти{' '}
                <Link className="text-medium !underline" href={routes.user.exams}>
                  экзамен
                </Link>
              </Text>
            </>
          ) : (
            <>
              <LockColorIcon />
              <Text variant={'l'}>
                После завершения всех уроков откроется доступ к{' '}
                <Link className="text-medium !underline" href={routes.user.exams}>
                  экзамену
                </Link>
              </Text>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link className="text-medium" href={routes.user.exams}>
            <Button disabled={!isAvailableExam(progress)} className="mr-2">
              Начать экзамен
            </Button>
          </Link>
          <ProgressBar strokeWidth={6} size={27} value={progress} variant="circular" />
          <Text variant={'l'} className="font-montserrat text-medium font-semibold">
            {progress}%
          </Text>
        </div>
      </CardWrapper>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-full max-w-md flex-col gap-4 rounded bg-white p-6">
            <h2 className="text-lg font-bold">
              {editingLessonId ? 'Редактирование урока' : 'Создание нового урока'}
            </h2>

            <input
              className="rounded border p-2"
              placeholder="Название урока"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="rounded border p-2"
              placeholder="Описание урока"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <textarea
              className="h-40 rounded border p-2"
              placeholder="Контент (Markdown)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <Button variant="white" size="small" onClick={() => setModalOpen(false)}>
                Отмена
              </Button>
              <Button variant="blue" size="small" onClick={handleSaveLesson}>
                {editingLessonId ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
