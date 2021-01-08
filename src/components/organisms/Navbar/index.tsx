//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter, RouteComponentProps } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
//> Redux
import { connect } from "react-redux";

//> Store Types
import { RootState } from "../../../store/reducers/index";
import { UserState } from "../../../store/types";
//> Store Actions
import { logoutAction } from "../../../store/actions/userActions";
//> Style Sheet
import "./indes.scss";
//> Logo
import logo from "../../../assets/logo.png";
//#endregion

//#region > Interfaces
interface State {
  isOpen: boolean;
}
interface OwnProps {}
interface StateProps {
  user: UserState;
}
interface DispatchProps {
  logout: () => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
class Navbar extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  async logout() {
    this.props.logout();
  }

  render() {
    return (
      <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <>
            <img src={logo} alt="Logo"></img>
          </>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle
                  nav
                  caret
                  hidden={this.props.user.anonymous !== false}
                >
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu right>
                  <MDBDropdownItem
                    hidden={!this.props.user.isOhrwurmSupervisor}
                    onClick={() => this.props.history.push("/members")}
                  >
                    Members
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    onClick={() => this.props.history.push("/change-password")}
                  >
                    Change password
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#" onClick={() => this.logout()}>
                    Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state: RootState) => ({ user: state.user });

const mapDispatchToProps = {
  logout: logoutAction,
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
