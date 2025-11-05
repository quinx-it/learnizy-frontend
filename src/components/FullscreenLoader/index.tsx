import { FC } from 'react';

import Spinner from '@/components/Spinner';

const FullscreenLoader: FC = () => {
  return (
    <div className="text-medium flex h-screen items-center justify-center">
      <Spinner size={100} />
    </div>
  );
};

export default FullscreenLoader;
