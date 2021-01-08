//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import {
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
//> Redux
// Allows to React components read data from a Redux store, and dispatch actions
// to the store to update data.
import { connect } from "react-redux";

//> Components
import { OhrwurmPage, OhrwurmMemberPage } from "./components/pages";
import LoginPage from "./components/pages/LoginPage/index";
import PasswordChangePage from "./components/pages/PasswordChangePage/index";
import MemberPage from "./components/pages/ohrwurm/MemberPage";

import { RootState } from "./store/reducers/index";
import { ThunkDispatch } from "redux-thunk";
import { UserState } from "./store/types";
import { Ohrwurm } from "./components/organisms";
//#endregion

//#region > Interfaces
interface OwnProps {}
interface StateProps {
  user: UserState;
}
interface DispatchProps {}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
/** @class Route component which includes all routes to specified components */
class Routes extends React.Component<Props, {}> {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={() => <OhrwurmPage />} />
        <Route exact path="/members" component={() => <OhrwurmMemberPage />} />
        <Route exact path="/login" component={() => <LoginPage />} />
        <Route
          exact
          path="/change-password"
          component={() => <PasswordChangePage />}
        />
      </Switch>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state: RootState) => ({ user: state.user });

const mapDispatchToProps = (dispatch: any) => {
  return {};
};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
