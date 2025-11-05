import React from 'react';

import { Spinner } from '@/ui/spinner';

export const FullscreenLoader = () => {
  return (
    <div className="text-medium flex h-screen items-center justify-center">
      <Spinner size={100} />
    </div>
  );
};
