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
import { loginAction } from "../../../store/actions/userActions";
//> Service Registry
import Services from "../../../serviceRegistry.json";
//> Components
import { Breadcrumbs } from "../../atoms";
import { LoginForm, ServiceGroup } from "../../molecules";
//#endregion

//#region > Types
type FormType = "SERVICE" | "AUTH";
//#endregion

//#region > Interfaces
interface State {
  activeForm: FormType;
}
interface OwnProps {}
interface StateProps {
  user: UserState;
}
interface DispatchProps {
  login: (user?: { username: string; password: string }) => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
/** @class This component displays the login page */
class LoginPage extends React.Component<Props, State> {
  state: State = {
    activeForm: "SERVICE",
  };

  switchForm = (form: FormType) => {
    this.setState({ activeForm: form });
  };

  submitService = (serviceIndex: number) => {
    window.localStorage.setItem(
      "ohrwurm_service_index",
      serviceIndex.toString()
    );

    this.switchForm("AUTH");
  };

  submitAuth = async (username: string, password: string) => {
    this.props.login({ username, password });
    this.props.history.push("/");
  };

  render() {
    if (this.props.user.anonymous === undefined) this.props.login();

    return (
      <div id="login" className="m-5">
        {this.props.user.anonymous === true && (
          <MDBContainer>
            {this.state.activeForm === "SERVICE" ? (
              <>
                <Breadcrumbs
                  crumbs={[
                    {
                      name: "Services",
                      active: true,
                    },
                  ]}
                ></Breadcrumbs>
                <ServiceGroup
                  entries={Services.ohrwurm}
                  onSubmit={this.submitService}
                ></ServiceGroup>
              </>
            ) : (
              <>
                <Breadcrumbs
                  crumbs={[
                    {
                      name: "Services",
                      onClick: () => this.switchForm("SERVICE"),
                    },
                    { name: "Authenticate to Service", active: true },
                  ]}
                ></Breadcrumbs>
                <LoginForm onSubmit={this.submitAuth}></LoginForm>
              </>
            )}
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
  login: loginAction,
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
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
//#endregion
/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
