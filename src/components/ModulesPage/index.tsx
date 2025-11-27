'use client';

import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  useGetModulesQuery,
  useGetModuleProgressQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  IModuleInfo,
} from '@/api/endpoints/admin';
import { CompletionStatus } from '@/api/endpoints/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/Dialog';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import Input from '@/components/Input';
import { ModuleCard } from '@/components/ModuleCard';
import Textarea from '@/components/Textarea';
import { showToast } from '@/components/Toaster';
import { routes } from '@/const';
import { globalConstants } from '@/const/constants';
import { useTranslation } from '@/hooks';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { IModuleProgressCardProps } from './typings';

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

const ModulesPage: FC = () => {
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.MENTOR;
  const { t } = useTranslation();

  const {
    data: modulesData,
    isLoading,
    isError,
    refetch,
  } = useGetModulesQuery({ page: 0, size: 20 });
  const [createModule] = useCreateModuleMutation();
  const [updateModule] = useUpdateModuleMutation();
  const [deleteModule] = useDeleteModuleMutation();

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
    const mod = modulesData?.content.find((m) => m.id === moduleId);

    if (!mod) return;

    setEditingModuleId(moduleId);
    setTitle(mod.title);
    setDescription(mod.description);
    setSequenceOrder(mod.sequenceOrder);
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
        rootLabel={t(globalConstants.rootBreadcrumbLabels.modulesLabel)}
        rootHref={routes.user.knowlegeBase}
        rootDescription="Java Core"
      />
      {isMentor && (
        <div className="mb-4">
          <Button variant="blue" size="small" onClick={openCreateModal}>
            Создать новый модуль
          </Button>
        </div>
      )}

      {modalOpen && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingModuleId ? 'Редактирование модуля' : 'Создание нового модуля'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <Input
                type="number"
                placeholder="Порядковый номер"
                value={sequenceOrder}
                min={1}
                onChange={(e) => setSequenceOrder(Number(e.target.value))}
              />
              <Input
                placeholder="Название модуля"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Описание модуля"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="white" size="small" onClick={() => setModalOpen(false)}>
                Отмена
              </Button>
              <Button variant="blue" size="small" onClick={handleSaveModule}>
                {editingModuleId ? 'Сохранить' : 'Создать'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

export default ModulesPage;
