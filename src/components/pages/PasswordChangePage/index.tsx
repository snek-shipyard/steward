//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter, RouteComponentProps } from "react-router-dom";
//> Redux
import { connect } from "react-redux";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBContainer } from "mdbreact";

//> Store Types
import { RootState } from "../../../store/reducers/index";
import { UserState } from "../../../store/types";
//> Store Actions
import { changePasswordAction } from "../../../store/actions/userActions";
//> Components
import { Breadcrumbs } from "../../atoms";
import { PasswordChangeForm } from "../../molecules";
//#endregion

//#region > Interfaces
interface State {}
interface OwnProps {}
interface StateProps {
  user: UserState;
}
interface DispatchProps {
  changePassword: (newPassword: string) => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
/** @class This component displays the password change page */
class PasswordChangePage extends React.Component<Props, State> {
  submitPasswordChange = async (newPassword: string) => {
    this.props.changePassword(newPassword);
    this.props.history.push("/");
  };

  render() {
    if (this.props.user.anonymous === true) this.props.history.push("/login");

    return (
      <div id="change-password" className="m-5">
        {this.props.user.anonymous === false && (
          <MDBContainer>
            <>
              <Breadcrumbs
                crumbs={[
                  {
                    name: "Ohrwurm",
                    // onClick: () => this.switchForm("SERVICE"),
                  },
                  {
                    name: "Change password",
                    active: true,
                  },
                ]}
              ></Breadcrumbs>
              <PasswordChangeForm
                username={this.props.user.username}
                onSubmit={this.submitPasswordChange}
              ></PasswordChangeForm>
            </>
          </MDBContainer>
        )}
      </div>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state: RootState) => ({ user: state.user });

const mapDispatchToProps = {
  changePassword: changePasswordAction,
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PasswordChangePage)
);
//#endregion
/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
