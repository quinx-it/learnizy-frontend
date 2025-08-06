import { StatusKey } from "./constants";

export type ModuleState = StatusKey;

export type ModuleStatus = {
  state: ModuleState;
  progress: string | number | null;
  total_stars?: number | null;
};

type Task = {
  name: string;
  start: number;
  total_stars: number;
  id: number | string;
};

type Lesson = {
  name: string;
  verified: boolean;
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
  lessons: Lesson[];
  total_tasks: number;
  status: ModuleStatus;
  bonus: boolean;
  img_url: string;
};
