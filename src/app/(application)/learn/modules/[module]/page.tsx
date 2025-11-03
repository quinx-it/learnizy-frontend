'use client';
import { ModuleItemPage } from '@/shared/appPages/ModulesItemPage';
import { useParams } from 'next/navigation';
import { ParamsType } from '../typings';

const ModuleItem = () => {
  const params = useParams<ParamsType>();
  const { module } = params;

  return <ModuleItemPage id={module} />;
};

export default ModuleItem;
