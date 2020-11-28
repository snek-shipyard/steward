//#region > Imports
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { combineReducers } from "redux";
// LoadingBar
import { loadingBarReducer } from "react-redux-loading-bar";

//> Reducers
// User
import userReducers from "./userReducers";
import ohrwurmReducer from "./ohrwurmReducers";
//#endregion

//#region > Config
const rootReducer = combineReducers({
  // Loading bar
  loadingBar: loadingBarReducer,
  // User data
  user: userReducers,
  // Ohrwurm
  ohrwurm: ohrwurmReducer,
});
//#endregion

//#region > Exports
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Simon Prast
 */
