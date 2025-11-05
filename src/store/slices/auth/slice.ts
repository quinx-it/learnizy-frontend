import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { decodeToken } from '@/lib/utils';

import { IAuthState, IDecodedToken, IRehydrateAction } from './typings';

const initialState: IAuthState = {
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      try {
        const { user }: IDecodedToken = decodeToken(action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.user = user;
      } catch {
        state.accessToken = null;
        state.user = null;
      }
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase('persist/REHYDRATE', (state, action: IRehydrateAction & { key: string }) => {
      if (action.key !== 'auth') return;

      const accessToken = action?.payload?.accessToken;

      if (accessToken) {
        try {
          const { user }: IDecodedToken = decodeToken(accessToken);
          state.accessToken = accessToken;
          state.user = user;
        } catch {
          state.accessToken = null;
          state.user = null;
        }
      }
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
