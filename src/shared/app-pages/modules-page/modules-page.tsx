'use client';
import React, { FC, useState } from 'react';
import { ModuleCard } from '@/shared/components/module-card';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { routes } from '@/shared/constants';
import { globalConstants } from '@/shared/constants/constants';

import {
  useGetModulesQuery,
  useGetModuleProgressQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} from '@/api/endpoints/admin';
import { IModuleInfo, IModuleResponse } from '@/api/endpoints/admin/typings';
import { CompletionStatus } from '@/api/endpoints/types';

import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';
import { useSelector } from 'react-redux';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/types';
import { Button } from '@/shared/ui/button';
import { showToast } from '@/shared/ui/toaster';

interface IModuleProgressCardProps {
  module: IModuleResponse;
  isMentor: boolean;
  openEditModal: (moduleId: number) => void;
  handleDeleteModule: (moduleId: number) => void;
}

const ModuleProgressCard: FC<IModuleProgressCardProps> = (props) => {
  const { module, isMentor, openEditModal, handleDeleteModule } = props;

  const courseId = 1;

  const { data: progressData, isError } = useGetModuleProgressQuery({
    courseId,
    moduleId: module.id,
  });

  let moduleInfo: IModuleInfo;

  if (isError || !progressData) {
    moduleInfo = {
      ...module,
      totalLessons: 0,
      completedLessons: 0,
      completionStatus: CompletionStatus.NOT_STARTED,
    };
  } else {
    moduleInfo = {
      ...progressData.moduleInfo,
      completionStatus: progressData.moduleInfo.completionStatus as CompletionStatus,
    };
  }

  return (
    <div className="flex flex-col">
      <ModuleCard className="h-full w-full max-w-full" {...moduleInfo} />

      {isMentor && (
        <div className="mt-2 flex gap-2">
          <Button variant="yellow" size="small" onClick={() => openEditModal(module.id)}>
            Редактировать
          </Button>
          <Button variant="white" size="small" onClick={() => handleDeleteModule(module.id)}>
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
};

export const ModulesPage = () => {
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.MENTOR;

  const {
    data: modulesData,
    isLoading,
    isError,
    refetch,
  } = useGetModulesQuery({ page: 0, size: 20 });
  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

  console.log(modulesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sequenceOrder, setSequenceOrder] = useState(1);

  const openCreateModal = () => {
    setEditingModuleId(null);
    setTitle('');
    setDescription('');
    setSequenceOrder(modulesData ? modulesData.totalElements + 1 : 1);
    setModalOpen(true);
  };

  const openEditModal = (moduleId: number) => {
    const module = modulesData?.content.find((m) => m.id === moduleId);
    if (!module) return;

    setEditingModuleId(moduleId);
    setTitle(module.title);
    setDescription(module.description);
    setSequenceOrder(module.sequenceOrder);
    setModalOpen(true);
  };

  const handleSaveModule = async () => {
    try {
      if (editingModuleId) {
        await updateModule({
          id: editingModuleId,
          data: { title, description, courseId: 1, sequenceOrder },
        }).unwrap();
      } else {
        await createModule({ title, description, courseId: 1, sequenceOrder }).unwrap();
      }
      setModalOpen(false);
      refetch();
    } catch {
      showToast('error', 'Ошибка', 'Ошибка при сохранении модуля');
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    try {
      await deleteModule(moduleId).unwrap();
      refetch();
    } catch {
      showToast('error', 'Ошибка', 'Ошибка при удалении модуля');
    }
  };

  if (isLoading) return <FullscreenLoader />;
  if (isError) return <ErrorSection reset={refetch} />;

  return (
    <>
      <Breadcrumbs
        rootLabel={globalConstants.rootBreadcrumbLabels.modulesLabel}
        rootHref={routes.user.knowlegeBase}
        rootDescription={'Java Core'}
      />
      {isMentor && (
        <div className="mb-4">
          <Button variant="blue" size="small" onClick={openCreateModal}>
            Создать новый модуль
          </Button>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="flex w-full max-w-md flex-col gap-4 rounded bg-white p-6">
            <h2 className="text-lg font-bold">
              {editingModuleId ? 'Редактирование модуля' : 'Создание нового модуля'}
            </h2>
            <input
              className="rounded border p-2"
              placeholder="Название модуля"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="rounded border p-2"
              placeholder="Описание модуля"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="rounded border p-2"
              type="number"
              placeholder="Порядковый номер"
              value={sequenceOrder}
              min={1}
              onChange={(e) => setSequenceOrder(Number(e.target.value))}
            />
            <div className="flex justify-end gap-2">
              <Button variant="white" size="small" onClick={() => setModalOpen(false)}>
                Отмена
              </Button>
              <Button variant="blue" size="small" onClick={handleSaveModule}>
                {editingModuleId ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {modulesData?.content
          .slice()
          .sort((a, b) => a.sequenceOrder - b.sequenceOrder)
          .map((module) => (
            <ModuleProgressCard
              key={module.id}
              module={module}
              isMentor={isMentor}
              openEditModal={openEditModal}
              handleDeleteModule={handleDeleteModule}
            />
          ))}
      </div>
    </>
  );
};
