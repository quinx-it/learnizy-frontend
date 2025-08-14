import { StatusKey } from './constants';

export type ModuleState = StatusKey;

export type ModuleStatus = {
  state: ModuleState;
  progress: string | number | null;
  total_stars?: number | null;
};

type Task = {
  name: string;
  stars: number;
  total_stars: number;
  id: number | string;
};

export const lessonStatuses = {
  VERIFIED: 'verified',
  ACTIVE: 'active',
  BLOCKED: 'blocked',
} as const;

type LessonStatus = (typeof lessonStatuses)[keyof typeof lessonStatuses];

export type LessonType = {
  name: string;
  status: LessonStatus;
  stars: number;
  total_stars: number;
  tasks: Task[];
  id: number | string;
};

export type ModuleCardType = {
  title: string;
  id: string | number;
  module_number: number;
  description: string;
  lessons: LessonType[];
  total_tasks: number;
  status: ModuleStatus;
  bonus: boolean;
  img_url: string;
};
