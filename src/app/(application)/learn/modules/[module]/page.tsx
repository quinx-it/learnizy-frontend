'use client';

import { ModuleItemPage } from '@/pages/modules-item-page';
import { NotFoundPage } from '@/pages/notFound-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../typings';

const ModuleItem = () => {
  const params = useParams<ParamsType>();

  if (!params || !params.module) {
    return <NotFoundPage />;
  }

  const { module } = params;

  return <ModuleItemPage id={module} />;
};

export default ModuleItem;
