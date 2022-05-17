import { createSelector } from "reselect";

const getState = (state) => state;

export const getUserInfo = createSelector(getState, (state) => state.userInfo);
export const getYear = createSelector(getState, (state) => state.year);