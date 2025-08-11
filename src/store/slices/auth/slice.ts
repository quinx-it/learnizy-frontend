import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from '@shared/lib/utils';
import { AuthState, DecodedToken } from './types';

const initialState: AuthState = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MDQwNzgwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      try {
        const { user }: DecodedToken = decodeToken(action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.user = user;
      } catch (e) {
        console.error('Failed to decode token', e);
        state.accessToken = null;
        state.user = null;
      }
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
