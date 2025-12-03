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

import {
  BlueButtonSmall,
  ButtonsWrapper,
  CreateButtonWrapper,
  DialogContentWrapper,
  DialogFooterWrapper,
  FormContent,
  ModuleCardWrapper,
  ModuleProgressCardContainer,
  ModulesGrid,
  PageContainer,
  WhiteButton,
  YellowButton,
} from './styles';

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
    <ModuleProgressCardContainer>
      <ModuleCardWrapper>
        <ModuleCard {...moduleInfo} />
      </ModuleCardWrapper>

      {isMentor && (
        <ButtonsWrapper>
          <YellowButton onClick={() => openEditModal(module.id)}>Редактировать</YellowButton>
          <WhiteButton onClick={() => handleDeleteModule(module.id)}>Удалить</WhiteButton>
        </ButtonsWrapper>
      )}
    </ModuleProgressCardContainer>
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
    <PageContainer>
      <Breadcrumbs
        rootLabel={t(globalConstants.rootBreadcrumbLabels.modulesLabel)}
        rootHref={routes.user.knowlegeBase}
        rootDescription="Java Core"
      />
      {isMentor && (
        <CreateButtonWrapper>
          <BlueButtonSmall onClick={openCreateModal}>Создать новый модуль</BlueButtonSmall>
        </CreateButtonWrapper>
      )}

      {modalOpen && (
        <DialogContentWrapper>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingModuleId ? 'Редактирование модуля' : 'Создание нового модуля'}
                </DialogTitle>
              </DialogHeader>

              <FormContent>
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
              </FormContent>

              <DialogFooterWrapper>
                <DialogFooter>
                  <WhiteButton onClick={() => setModalOpen(false)}>Отмена</WhiteButton>
                  <BlueButtonSmall onClick={handleSaveModule}>
                    {editingModuleId ? 'Сохранить' : 'Создать'}
                  </BlueButtonSmall>
                </DialogFooter>
              </DialogFooterWrapper>
            </DialogContent>
          </Dialog>
        </DialogContentWrapper>
      )}

      <ModulesGrid>
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
      </ModulesGrid>
    </PageContainer>
  );
};

export default ModulesPage;
