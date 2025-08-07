'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Spinner } from '@/shared/ui/spinner';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor} loading={<Spinner />}>
        {children}
      </PersistGate>
    </Provider>
  );
}
