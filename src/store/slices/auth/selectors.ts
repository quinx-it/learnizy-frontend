import { RootStateType } from '@/store';
import { createSelector } from 'reselect';

export const selectAuth = (state: RootStateType) => state.auth;

export const selectUser = createSelector(selectAuth, (auth) => auth?.user);

export const selectToken = createSelector(selectAuth, (auth) => auth?.accessToken);

export const selectUserRole = createSelector(selectAuth, (auth) => auth?.user?.role);
