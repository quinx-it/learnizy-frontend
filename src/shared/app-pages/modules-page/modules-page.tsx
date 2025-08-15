import React from 'react';
import { constants } from './constants';
import { ModuleCard } from '@/shared/components/module-card';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { routes } from '@/shared/constants';
import { globalConstants } from '@/shared/constants/constants';

export const ModulesPage = () => {
  return (
    <>
      <Breadcrumbs rootLabel={globalConstants.rootBreadcrumbLabels.knowlegeBaseLabel} rootHref={routes.knowlegeBase} rootDescription={'Java Core'} />
      <div className="grid grid-cols-2 gap-4">
        {constants.mockModules.map((module) => (
          <ModuleCard className="w-full max-w-full" key={module.id} {...module} />
        ))}
      </div>
    </>
  );
};

