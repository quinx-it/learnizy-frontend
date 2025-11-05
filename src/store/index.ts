import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { api } from '@/api';

import { authPersistConfig } from './persistConfig';
import authReducer from './slices/auth/slice';

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [api.reducerPath]: api.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
  });

export const store = makeConfiguredStore();
export const persistor = persistStore(store);

export type AppStoreType = typeof store;
export type RootStateType = ReturnType<AppStoreType['getState']>;
export type AppDispatchType = AppStoreType['dispatch'];
