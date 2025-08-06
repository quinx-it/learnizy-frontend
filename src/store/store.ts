import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './slices/auth/slice';
import { authPersistConfig } from './persistConfig';
import { api } from '@/api/api';

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [api.reducerPath]: api.reducer,
});

const persistedReducer = rootReducer;

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
  });

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
