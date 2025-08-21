import { PersistConfig } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { AuthState } from './slices/auth/types'

export const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage: createWebStorage('local'),
  whitelist: ['accessToken'],
}