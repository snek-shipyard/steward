//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//#endregion

//#region > Components
/** @class This component displays the landing page including login and register */
class HomePage extends React.Component {
  render() {
    return (
      <div id="home" className="pt-5">
        TEST
      </div>
    );
  }
}
//#endregion

//#region > Exports

/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 */
export default HomePage;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
