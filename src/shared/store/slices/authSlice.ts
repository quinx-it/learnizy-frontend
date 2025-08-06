import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decodeToken } from '@shared/lib/utils'
import { AuthState, UserRole } from '../types'
import { AppDispatch, persistor } from '../store'

const initialState: AuthState = {
    accessToken: null,
    userName: null,
    role: UserRole.GUEST,
}

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout())
  persistor.purge()
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
            try {
                const user = decodeToken(action.payload.accessToken)
                state.accessToken = action.payload.accessToken
                state.userName = user.userName
                state.role = user.role
            } catch (e) {
                console.error('Failed to decode token', e)
                state = initialState
            }
        },
        logout: () => initialState,
    },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer