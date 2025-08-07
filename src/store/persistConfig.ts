import storage from 'redux-persist/lib/storage' 
import { PersistConfig } from 'redux-persist'
import { AuthState } from './slices/auth/types'

export const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
}