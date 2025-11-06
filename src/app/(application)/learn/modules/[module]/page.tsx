'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import ModuleItemPage from '@/appPages/ModulesItemPage';

import { ParamsType } from '../typings';

const ModuleItem: FC = () => {
  const params = useParams<ParamsType>();
  const { module } = params;

  return <ModuleItemPage id={module} />;
};

export default ModuleItem;
