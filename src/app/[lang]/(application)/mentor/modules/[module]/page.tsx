'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import ModuleItemPage from '@/components/ModulesItemPage';

import { type ParamsType } from '../typings';

const ModuleItem: FC = () => {
  const params = useParams<ParamsType>();
  const { module } = params;

  return <ModuleItemPage id={module} />;
};

export default ModuleItem;
