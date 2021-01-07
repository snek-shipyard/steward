//#region > Imports
//> Action Types
import { UserState, LoginAction } from "../types";
//#endregion

//#region > Constant Variables
const INIT_STATE: UserState = {
  anonymous: undefined,
  passwordChanged: undefined,
  username: undefined,
  error: undefined,
  errorDetails: undefined,
};
//#endregion

//#region > Reducers
const userReducer = (state = INIT_STATE, action: LoginAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    //> Login
    case "USER_LOGIN_REQUEST":
      return state;
    case "USER_LOGIN_SUCCESS":
      return {
        username: payload?.username,
        isOhrwurmSupervisor: payload?.isOhrwurmSupervisor,
        passwordChanged: payload?.passwordChanged,
        anonymous: payload?.anonymous,
      };
    case "USER_LOGIN_FAILURE":
      return {
        ...INIT_STATE,
      };
    //> Logout
    case "USER_LOGOUT_REQUEST":
      return state;
    case "USER_LOGOUT_SUCCESS":
      return {
        anonymous: true,
        isOhrwurmSupervisor: undefined,
        passwordChanged: undefined,
        username: undefined,
      };
    case "USER_LOGOUT_FAILURE":
      return {
        ...INIT_STATE,
        error: payload?.error,
        errorDetails: payload?.errorDetails,
      };
    //> Change password
    case "USER_CHANGE_PASSWORD_REQUEST":
      return state;
    case "USER_CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        passwordChanged: true,
      };
    case "USER_CHANGE_PASSWORD_FAILURE":
      console.log("ERROR", payload);
      return {
        ...state,
        error: payload?.error,
        errorDetails: payload?.errorDetails,
      };

    default:
      return state;
  }
};
//#endregion

//#region > Exports
export default userReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
