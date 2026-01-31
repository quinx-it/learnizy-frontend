import { type JSX } from 'react';

import { type IModuleInfo } from '@/api/endpoints/modules';

import { type StatusValueType } from './const';

export interface IModuleCardProps extends IModuleInfo {
  className?: string;
  courseId?: number;
}

export type ProgressModuleType = {
  element: JSX.Element | null;
  status: StatusValueType;
};

export interface IProcentContentProps {
  progress: number | null | string;
}
