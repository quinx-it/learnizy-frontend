import { RootState } from "@/store/store";
import { createSelector } from 'reselect';

export const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector(
    selectAuth,
    (auth) => auth?.user,
);

