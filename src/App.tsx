//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { useEffect } from "react";
// DOM bindings for React Router
import { withRouter } from "react-router-dom";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { useDispatch } from "react-redux";

//> Components
// Starts the page on top when reloaded or redirected
import { ScrollToTop } from "./components/atoms";
//> Stylesheet
import "./App.css";
//> Routes
import Routes from "./Routes";
import { loginAction } from "./store/actions/userActions";
//#endregion

//#region > Components
/**
 * @class Root component which loads all other components
 */
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginAction());
  });

  return (
    <>
      <div className="flyout">
        <main>
          <Routes />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};
//#endregion

//#region > Exports
export default withRouter(App);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Nico Schett
 */
