import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { authPersistConfig } from './persistConfig'
import authReducer from './slices/auth/slice'
import { api } from '@/api/api'

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    [api.reducerPath]: api.reducer,
})

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware)
    })

export const store = makeConfiguredStore()
export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
