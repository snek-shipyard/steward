//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";

//> Components
import { Footer, Navbar } from "./components/molecules";
// Starts the page on top when reloaded or redirected
import { ScrollToTop } from "./components/atoms";
//> Stylesheet
import "./App.css";
//> Routes
import Routes from "./Routes";
//#endregion

//#region > Components
/**
 * @class Root component which loads all other components
 */
const App = () => {
  return (
    <>
      <ScrollToTop>
        <div className="flyout">
          <Navbar />
          <main>
            <Routes />
          </main>
          <Footer />
        </div>
      </ScrollToTop>
    </>
  );
};
//#endregion

//#region > Exports
export default App;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Nico Schett
 */
