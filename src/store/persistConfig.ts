import { PersistConfig, createTransform } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { AuthState } from './slices/auth/types'

const storage = createWebStorage('local')

const stringTransform = createTransform(
  (inboundValue: string) => inboundValue,
  (outboundValue: string) => outboundValue
)

export const authPersistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
  transforms: [stringTransform],
}