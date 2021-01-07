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
import { MDBCol, MDBRow, MDBInput, MDBBtn, MDBIcon } from "mdbreact";

//> Store Types
import { RootState } from "../../../../store/reducers/index";
import { UserState, OhrwurmState } from "../../../../store/types";
//> Store Actions
import { loginAction } from "../../../../store/actions/userActions";
import {
  addMemberAction,
  deleteMemberAction,
  fetchMembersAction,
  updateMemberAction,
} from "../../../../store/actions/ohrwurmActions";
//> Components
import { Breadcrumbs } from "../../../atoms";
import { MemberTable } from "../../../molecules";
import { MemberModal } from "../../../organisms/modals";
//#endregion

//#region > Interfaces
interface State {
  searchQuery: string;
  memberModal: boolean;
  username: string;
  editing: boolean;
}
interface OwnProps {}
interface StateProps {
  user: UserState;
  ohrwurm: OhrwurmState;
}
interface DispatchProps {
  fetchMembers: () => void;
  addMember: (
    username: string,
    pacs?: string[],
    isOhrwurmSupervisor?: boolean
  ) => void;
  deleteMember: (username: string) => void;
  updateMember: (
    username: string,
    pacs?: string[],
    isOhrwurmSupervisor?: boolean
  ) => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
/** @class This component displays the login page */
class MemberPage extends React.Component<Props, State> {
  state: State = {
    searchQuery: "",
    memberModal: false,
    username: "",
    editing: false,
  };

  componentDidMount = () => {
    this.props.fetchMembers();
  };

  deleteUser = async (username: string) => {
    this.props.deleteMember(username);
  };

  editUser = (username: string) => {
    this.setState({ username });
    this.toggleMemberModal();
  };

  search = (value: string) => {
    this.setState({ searchQuery: value });
  };

  toggleMemberModal = () => {
    this.setState({
      memberModal: !this.state.memberModal,
    });

    if (this.state.memberModal) {
      this.setState({ username: "" });
    }
  };

  render() {
    return (
      <>
        <div id="base" className="mt-1">
          <div className="ml-5 mr-5">
            <Breadcrumbs
              crumbs={[
                {
                  name: "Ohrwurm",
                  onClick: () => this.props.history.push("/"),
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
                  disabled
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
              entries={this.props.ohrwurm.members?.items}
              onDeleteClick={(username: string) => this.deleteUser(username)}
              onEditClick={(username: string) => this.editUser(username)}
            ></MemberTable>
          </div>
        </div>
        {this.state.memberModal && (
          <MemberModal
            toggle={this.toggleMemberModal}
            username={this.state.username}
            addMember={this.props.addMember}
            updateMember={this.props.updateMember}
          />
        )}
      </>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state: RootState) => ({
  user: state.user,
  ohrwurm: state.ohrwurm,
});

const mapDispatchToProps = {
  login: loginAction,
  fetchMembers: fetchMembersAction,
  addMember: addMemberAction,
  deleteMember: deleteMemberAction,
  updateMember: updateMemberAction,
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
