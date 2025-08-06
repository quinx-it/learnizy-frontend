import storage from 'redux-persist/lib/storage' // localStorage
import { PersistConfig } from 'redux-persist'
import { AuthState } from './types'

export const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'userName', 'role'],
}