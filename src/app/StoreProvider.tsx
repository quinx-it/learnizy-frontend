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
      <PersistGate
        loading={
          <div className='text-medium flex items-center justify-center h-screen'>
            <Spinner size={100} />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
