'use client';
import { ModuleItemPage } from '@/shared/app-pages/modules-item-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  id: string;
}

const ModuleItem = () => {
  const params = useParams<ParamsType>();
  const { id } = params;

  return <ModuleItemPage id={id} />;
};

export default ModuleItem;
