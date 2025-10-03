'use client';
import { ModuleItemPage } from '@/shared/app-pages/modules-item-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  module: string;
};

const ModuleItem = () => {
  const params = useParams<ParamsType>();
  const { module } = params;

  return <ModuleItemPage id={module} />;
};

export default ModuleItem;
