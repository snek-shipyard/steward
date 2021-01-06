//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter, RouteComponentProps } from "react-router-dom";
//> Redux
import { connect } from "react-redux";

//> Store Types
import { UserState } from "../../../store/types";
import { RootState } from "../../../store/reducers/index";
//> Components
import { Ohrwurm } from "../../organisms";
//#endregion

//#region > Interfaces
interface State {}
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
/** @class This component displays the landing page including login and register */
class OhrwurmPage extends React.Component<Props, State> {
  render() {
    if (this.props.user.passwordChanged === false) {
      this.props.history.push("/change-password");
    }

    return (
      <>
        {this.props.user.anonymous === false && (
          <>
            <div id="base" className="mt-1">
              <div className="ml-5 mr-5">
                <Ohrwurm></Ohrwurm>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state: RootState) => ({ user: state.user });

const mapDispatchToProps = {};
//#endregion

//#region > Exports
/**
 * Provides its connected component with the pieces of the data it needs from
 * the store, and the functions it can use to dispatch actions to the store.
 *
 * Got access to the history object’s properties and the closest
 * <Route>'s match.
 */
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OhrwurmPage)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
