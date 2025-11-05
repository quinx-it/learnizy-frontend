import React from 'react';

import { Spinner } from '@/components/ui/Spinner';

export const FullscreenLoader = () => {
  return (
    <div className="text-medium flex h-screen items-center justify-center">
      <Spinner size={100} />
    </div>
  );
};
