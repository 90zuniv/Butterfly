import { SET_LOGGED_IN } from "./types";

export const setLoggedIn = (isLoggedIn) => {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn,
  };
};