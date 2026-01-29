import { type IModuleResponse } from '@/api/endpoints/admin';

export interface IModuleProgressCardProps {
  module: IModuleResponse;
  isMentor: boolean;
  openEditModal: (moduleId: number) => void;
  handleDeleteModule: (moduleId: number) => void;
  shouldBlock?: boolean;
  courseId: number;
}

export interface IModulesPageProps {
  courseId?: number;
}
