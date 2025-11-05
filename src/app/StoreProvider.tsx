'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { FullscreenLoader } from '@/components/FullscreenLoader';
import { store, persistor } from '@/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<FullscreenLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
