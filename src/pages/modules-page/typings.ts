import { IModuleResponse } from '@/api/endpoints/admin/typings';

export interface IModuleProgressCardProps {
  module: IModuleResponse;
  isMentor: boolean;
  openEditModal: (moduleId: number) => void;
  handleDeleteModule: (moduleId: number) => void;
}
