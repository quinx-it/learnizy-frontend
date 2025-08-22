'use client';
import React from 'react';
import { ModuleCard } from '@/shared/components/module-card';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { routes } from '@/shared/constants';
import { globalConstants } from '@/shared/constants/constants';
import { useGetModulesQuery } from '@/api/endpoints/modules/modules';
import { ModuleInfo } from '@/api/endpoints/modules/types';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';
import { ErrorSection } from '@/shared/components/error-section';

export const ModulesPage = () => {
  const { data: modules, isLoading, isError, refetch } = useGetModulesQuery(1);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isError) {
    return <ErrorSection reset={refetch} />;
  }

  return (
    <>
      <Breadcrumbs
        rootLabel={globalConstants.rootBreadcrumbLabels.knowlegeBaseLabel}
        rootHref={routes.user.knowlegeBase}
        rootDescription={'Java Core'}
      />
      <div className="grid grid-cols-2 gap-4">
        {modules?.map((module: ModuleInfo, index) => (
          <ModuleCard className="w-full max-w-full" key={module.id} index={index} {...module} />
        ))}
      </div>
    </>
  );
};
