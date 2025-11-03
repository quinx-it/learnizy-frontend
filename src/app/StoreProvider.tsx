'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader';

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<FullscreenLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
