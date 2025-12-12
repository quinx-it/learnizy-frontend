import { type PersistConfig } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { type IAuthState } from './slices/auth/typings';

const createNoopStorage = () => {
  return {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const authPersistConfig: PersistConfig<IAuthState> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};
