'use client';

import { type FC, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  useGetAdminModulesQuery,
  useGetModuleProgressQuery,
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useGetCourseByIdQuery,
  type IModuleInfo,
} from '@/api/endpoints/admin';
import { ModuleCompletionStatus, useGetMainPageProgressQuery } from '@/api/endpoints/progress';
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
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

import { type IModuleProgressCardProps, type IModulesPageProps } from './typings';

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
  const {
    module,
    isMentor,
    openEditModal,
    handleDeleteModule,
    shouldBlock = false,
    courseId,
  } = props;
  const { t } = useTranslation();

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
      completionStatus: shouldBlock ? CompletionStatus.Blocked : CompletionStatus.NotStarted,
    };
  } else {
    let completionStatus = progressData.moduleInfo.completionStatus as CompletionStatus;

    if (!isMentor && shouldBlock) {
      completionStatus = CompletionStatus.Blocked;
    }

    moduleInfo = {
      ...progressData.moduleInfo,
      completionStatus,
    };
  }

  return (
    <ModuleProgressCardContainer>
      <ModuleCardWrapper>
        <ModuleCard {...moduleInfo} courseId={courseId} />
      </ModuleCardWrapper>

      {isMentor && (
        <ButtonsWrapper>
          <YellowButton onClick={() => openEditModal(module.id)}>{t('COMMON.EDIT')}</YellowButton>
          <WhiteButton onClick={() => handleDeleteModule(module.id)}>
            {t('COMMON.DELETE')}
          </WhiteButton>
        </ButtonsWrapper>
      )}
    </ModuleProgressCardContainer>
  );
};

const ModulesPage: FC<IModulesPageProps> = (props) => {
  const { courseId = 2 } = props;
  const role = useSelector(selectUserRole);
  const isMentor = role === UserRole.Mentor;
  const { t } = useTranslation();

  const {
    data: modulesData,
    isLoading,
    isError,
    refetch,
  } = useGetAdminModulesQuery({ page: 0, size: 20, courseId });
  const { data: courseData } = useGetCourseByIdQuery(courseId);
  const { data: mainPageProgress } = useGetMainPageProgressQuery(courseId);
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
          data: { title, description, courseId, sequenceOrder },
        }).unwrap();
      } else {
        await createModule({ title, description, courseId, sequenceOrder }).unwrap();
      }

      setModalOpen(false);
      refetch();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('MODULES_PAGE.ERROR_SAVE'));
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    try {
      await deleteModule(moduleId).unwrap();
      refetch();
    } catch {
      showToast('error', t('COMMON.ERROR'), t('MODULES_PAGE.ERROR_DELETE'));
    }
  };

  if (isLoading) return <FullscreenLoader />;

  if (isError) return <ErrorSection reset={refetch} />;

  return (
    <PageContainer>
      <Breadcrumbs
        rootLabel={t('BREADCRUMBS.COURSES')}
        rootHref={isMentor ? ROUTES.MENTOR_COURSES : ROUTES.USER_COURSES}
        rootDescription={courseData?.title || t('COMMON.COURSE_LABEL')}
      />
      {isMentor && (
        <CreateButtonWrapper>
          <BlueButtonSmall onClick={openCreateModal}>
            {t('MODULES_PAGE.CREATE_MODULE')}
          </BlueButtonSmall>
        </CreateButtonWrapper>
      )}

      {modalOpen && (
        <DialogContentWrapper>
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingModuleId
                    ? t('MODULES_PAGE.EDIT_MODULE')
                    : t('MODULES_PAGE.CREATE_NEW_MODULE')}
                </DialogTitle>
              </DialogHeader>

              <FormContent>
                <Input
                  type="number"
                  placeholder={t('MODULES_PAGE.SEQUENCE_NUMBER')}
                  value={sequenceOrder}
                  min={1}
                  onChange={(e) => setSequenceOrder(Number(e.target.value))}
                />
                <Input
                  placeholder={t('MODULES_PAGE.MODULE_TITLE')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder={t('MODULES_PAGE.MODULE_DESCRIPTION')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormContent>

              <DialogFooterWrapper>
                <DialogFooter>
                  <WhiteButton onClick={() => setModalOpen(false)}>
                    {t('MODULES_PAGE.CANCEL')}
                  </WhiteButton>
                  <BlueButtonSmall onClick={handleSaveModule}>
                    {editingModuleId ? t('MODULES_PAGE.SAVE') : t('MODULES_PAGE.CREATE')}
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
          .map((module, index, sortedModules) => {
            let shouldBlock = false;

            if (!isMentor && index > 0 && mainPageProgress) {
              for (let i = 0; i < index; i += 1) {
                const prevModule = sortedModules[i];
                const prevModuleProgress = mainPageProgress.modules.find(
                  (m) => m.id === prevModule.id,
                );

                if (prevModuleProgress) {
                  if (prevModuleProgress.completionStatus !== ModuleCompletionStatus.Completed) {
                    shouldBlock = true;
                    break;
                  }
                } else {
                  shouldBlock = true;
                  break;
                }
              }
            }

            return (
              <ModuleProgressCard
                key={module.id}
                module={module}
                isMentor={isMentor}
                openEditModal={openEditModal}
                handleDeleteModule={handleDeleteModule}
                shouldBlock={shouldBlock}
                courseId={courseId}
              />
            );
          })}
      </ModulesGrid>
    </PageContainer>
  );
};

export default ModulesPage;
