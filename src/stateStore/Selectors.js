import { createSelector } from "reselect";

const getState = (state) => state;

export const getUserInfo = createSelector(getState, (state) => state.userInfo);