//#region > Imports
//> Additional
// SHA hashing algorithm
import { sha256 } from "js-sha256";
//> Error Serialization
// Serialize/deserialize an error into a plain object
import { serializeError } from "serialize-error";
//> Redux
import { ThunkAction, ThunkDispatch } from "redux-thunk";

//> Action Types
import { RootState } from "../reducers/index";
import { SnekClient, LoginAction } from "../types";
//#endregion,

//#region > Types
type loginArguments = {
  getClientSnek: () => SnekClient;
};
//#endregion

//#region > User Actions
const loginAction = (user?: {
  username: string;
  password: string;
}): ThunkAction<void, RootState, loginArguments, LoginAction> => {
  return async (
    dispatch: ThunkDispatch<RootState, loginArguments, LoginAction>,
    getState,
    { getClientSnek }
  ) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    try {
      if (user?.password) {
        user.password = sha256(user.password);
      }

      // Type any because .session.begin() does not return the correct type
      const whoami = (await getClientSnek().session.begin(user)) as any;

      if (!whoami?.anonymous && whoami?.__typename === "SNEKUser") {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: {
            username: whoami.username,
            anonymous: false,
          },
        });
      } else if (whoami.anonymous) {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: {
            anonymous: true,
          },
        });
      } else {
        throw Error("Login failed");
      }
    } catch (ex) {
      dispatch({
        type: "USER_LOGIN_FAILURE",
        payload: {
          error: {
            message: "Login failed",
          },
          errorDetails: serializeError(ex),
        },
      });
    }
  };
};

/**
 * Logout user.
 *
 * @description Handles the logging out of active users
 */
const logoutAction = (): ThunkAction<
  void,
  RootState,
  loginArguments,
  LoginAction
> => {
  return async (
    dispatch: ThunkDispatch<RootState, loginArguments, LoginAction>,
    getState,
    { getClientSnek }
  ) => {
    try {
      dispatch({ type: "USER_LOGOUT_REQUEST" });

      await getClientSnek().session.end();

      dispatch({ type: "USER_LOGOUT_SUCCESS" });
    } catch (ex) {
      let result = dispatch({
        type: "USER_LOGOUT_FAILURE",
        payload: {
          errorCode: 601,
          message: "Logout failed",
          error: ex,
        },
      });
      return result;
    }
  };
};
//#endregion

//#region > Exports
export { loginAction, logoutAction };
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Nico Schett
 */
