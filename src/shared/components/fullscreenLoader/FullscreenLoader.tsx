import { Spinner } from '@/shared/ui/Spinner';
import React from 'react';

export const FullscreenLoader = () => {
  return (
    <div className="text-medium flex h-screen items-center justify-center">
      <Spinner size={100} />
    </div>
  );
};
