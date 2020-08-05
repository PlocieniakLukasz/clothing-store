import { UserActionTypes } from "./user.types";

export const setCurrentUser = (user) => ({
  // takes user object
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
