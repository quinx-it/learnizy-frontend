'use client';

import { ModuleItemPage } from '@/pages/modules-item-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../typings';
import { NotFoundPage } from '@/pages/notFound-page';

const ModuleItem = () => {
  const params = useParams<ParamsType>();

  const moduleId = params?.module ?? '';

  if (!params || !moduleId) {
    return <NotFoundPage />;
  }

  return <ModuleItemPage id={moduleId} />;
};

export default ModuleItem;
