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
import { BasePage } from "./components/pages";
import LoginPage from "./components/pages/LoginPage/index";

import { RootState } from "./store/reducers/index";
import { ThunkDispatch } from "redux-thunk";
import { UserState } from "./store/types";
//#endregion

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

//#region > Components
/** @class Route component which includes all routes to specified components */
class Routes extends React.Component<Props, {}> {
  render() {
    const anonymous = this.props.user.anonymous;
    const location = this.props.location;

    console.log(anonymous, location);

    if (anonymous && location.pathname === "/")
      this.props.history.push("/login");

    if (anonymous === false && location.pathname === "/login")
      this.props.history.push("/");

    return (
      <Switch>
        <Route exact path="/" component={() => <BasePage />} />
        <Route exact path="/login" component={() => <LoginPage />} />
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
 * Copyright © 2019-2020 Nico Schett
 */