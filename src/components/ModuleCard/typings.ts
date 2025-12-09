import { JSX } from 'react';

import { StatusValueType } from './const';

export type ProgressModuleType = {
  element: JSX.Element | null;
  status: StatusValueType;
};

export interface IProcentContentProps {
  progress: number | null | string;
}
