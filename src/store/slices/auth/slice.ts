import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { decodeToken } from '@/shared/lib/utils';
import { AuthState, DecodedToken } from './types';

interface RehydrateAction extends Action<'persist/REHYDRATE'> {
  payload?: {
    accessToken?: string;
  };
}

const initialState: AuthState = {
  accessToken: null,
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
      } catch {
        state.accessToken = null;
        state.user = null;
      }
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase('persist/REHYDRATE', (state, action: RehydrateAction & { key: string }) => {
      if (action.key !== 'auth') return;

      const accessToken = action?.payload?.accessToken;
      if (accessToken) {
        try {
          const { user }: DecodedToken = decodeToken(accessToken);
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
