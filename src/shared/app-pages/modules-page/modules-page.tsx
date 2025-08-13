import React from 'react';
import { constants } from './constants';
import { ModuleCard } from '@/shared/components/module-card';

export const ModulesPage = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {constants.mockModules.map((module) => (
        <ModuleCard className="w-full max-w-full" key={module.id} {...module} />
      ))}
    </div>
  );
};

