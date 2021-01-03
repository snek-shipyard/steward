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
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

//> Store Types
import { RootState } from "../../../store/reducers/index";
import { UserState } from "../../../store/types";
//> Store Actions
import { loginAction } from "../../../store/actions/userActions";
//> Service Registry
import Services from "../../../serviceRegistry.json";
//> Components
import { Breadcrumbs } from "../../atoms";
import { LoginForm, ServiceGroup, MemberTable } from "../../molecules";
import { MemberModal } from "../../organisms/modals";
//#endregion

//#region > Interfaces
interface State {
  searchQuery: string;
  memberModal: boolean;
}
interface OwnProps {}
interface StateProps {
  user: UserState;
}
interface Props extends OwnProps, StateProps, RouteComponentProps {}
//#endregion

//#region > Components
/** @class This component displays the login page */
class MemberPage extends React.Component<Props, State> {
  state: State = {
    searchQuery: "",
    memberModal: false,
  };

  deleteUser = () => {
    alert();
  };

  editUser = () => {
    alert();
  };

  search = (value: string) => {
    this.setState({ searchQuery: value });

    // Add search for users
  };

  toggleMemberModal = () => {
    this.setState({
      memberModal: !this.state.memberModal,
    });
  };

  render() {
    return (
      <>
        <MDBContainer>
          <Breadcrumbs
            crumbs={[
              {
                name: "Ohrwurm",
                // onClick: () => this.switchForm("SERVICE"),
              },
              {
                name: "Members management",
                active: true,
              },
            ]}
          ></Breadcrumbs>
          <MDBRow>
            <MDBCol size="11">
              <MDBInput
                hint="Search"
                type="text"
                value={this.state.searchQuery}
                containerClass="active-pink active-pink-2 mt-0 mb-3"
                onChange={(e: any) => this.search(e.target.value)}
              />
            </MDBCol>
            <MDBCol size="1">
              <MDBBtn flat onClick={() => this.toggleMemberModal()}>
                <MDBIcon icon="plus" size="lg" className="blue-text" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MemberTable
            members={[]}
            onDeleteClick={() => this.deleteUser()}
            onEditClick={() => this.editUser()}
          ></MemberTable>
        </MDBContainer>
        {this.state.memberModal && (
          <MemberModal toggle={this.toggleMemberModal} />
        )}
      </>
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
  connect(mapStateToProps, mapDispatchToProps)(MemberPage)
);
//#endregion
/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
