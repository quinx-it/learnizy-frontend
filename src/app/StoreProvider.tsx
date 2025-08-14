'use client';
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { FullscreenLoader } from '@/shared/components/fullscreen-loader/fullscreen-loader';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={<FullscreenLoader /> }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
