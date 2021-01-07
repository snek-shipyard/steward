//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { FormEvent } from "react";
// DOM bindings for React Router
import { withRouter, RouteComponentProps } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBModal,
  MDBModalBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";
//> Redux
import { connect } from "react-redux";

//> Store Types
import { RootState } from "../../../../store/reducers/index";
import { OhrwurmState } from "../../../../store/types";
//> Store Actions
import { fetchPACSAction } from "../../../../store/actions/ohrwurmActions";
//> Style Sheet
import "./membermodal.scss";
//#endregion

//#region > Interfaces
interface State {
  searchQuery?: string;
  isOhrwurmSupervisor?: boolean;
  username: string;
  editing: boolean;
  pacs: string[];
}
interface OwnProps {
  toggle: any;
  addMember: any;
  updateMember: any;
  username: string;
}
interface StateProps {
  ohrwurm: OhrwurmState;
}
interface DispatchProps {
  fetchPACS: (searchQuery?: string) => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
class MemberModal extends React.Component<Props, State> {
  state: State = {
    searchQuery: "",
    username: "",
    isOhrwurmSupervisor: false,
    editing: false,
    pacs: [],
  };

  componentWillMount = () => {
    this.props.fetchPACS();

    if (this.props.username) {
      const member = this.props.ohrwurm.members?.items?.find(
        (member) => member.username === this.props.username
      );

      if (member) {
        this.setState({
          username: member.username,
          isOhrwurmSupervisor: member.isOhrwurmSupervisor,
          editing: true,
          pacs: member.pacs.map((pac) => {
            return pac.id;
          }),
        });
      }
    }
  };

  setUsername = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ username: e.currentTarget.value });
  };

  setSupervisor = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ isOhrwurmSupervisor: e.currentTarget.checked });
  };

  setProjects = (e: React.FormEvent<HTMLInputElement>): void => {
    let { pacs } = this.state;
    let pac = e.currentTarget.value;

    if ((pacs || []).includes(pac)) {
      pacs = pacs?.filter((f) => f !== pac);
    } else {
      pacs?.push(pac);
    }

    this.setState({ pacs });
  };

  search = (value: string) => {
    this.setState({ searchQuery: value });
    this.props.fetchPACS(value);
  };

  onSubmit = async () => {
    let { username, isOhrwurmSupervisor, pacs } = this.state;

    if (this.state.editing) {
      await this.props.updateMember(username, pacs, isOhrwurmSupervisor);
    } else {
      await this.props.addMember(username, pacs, isOhrwurmSupervisor);

      alert(
        `Generated password for user ${username}: <${this.props.ohrwurm.members?.added?.generatedPassword}>`
      );
    }

    this.props.toggle();
  };

  checkChecked = (id: string) => {
    if (this.state.pacs?.includes(id)) {
      return true;
    }

    return false;
  };

  render() {
    return (
      <MDBModal
        isOpen={true}
        toggle={this.props.toggle}
        size="lg"
        id="membermodal"
      >
        <MDBModalBody>
          <MDBRow>
            <MDBCol>
              <MDBInput
                id="input"
                className="input-track"
                label="Username"
                group
                type="text"
                validate
                disabled={this.state.editing}
                value={this.state.username}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setUsername(e)
                }
              />
              <MDBInput
                label="Supervisor"
                type="checkbox"
                id="checkbox1"
                checked={this.state.isOhrwurmSupervisor}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setSupervisor(e)
                }
              />
              <br />
              <label>Projects</label>
              <div className="rounded mb-0 border border-light">
                <div className="mb-0">
                  <MDBInput
                    hint="Search"
                    type="text"
                    value={this.state.searchQuery}
                    containerClass="active-pink active-pink-2 mt-0 mb-3"
                    onChange={(e: any) => this.search(e.target.value)}
                  />
                </div>
                <MDBListGroup>
                  {(this.props.ohrwurm?.pacs?.items || []).map((pac, id) => {
                    return (
                      <MDBListGroupItem>
                        <MDBInput
                          type="checkbox"
                          id={id.toString()}
                          label={pac.title}
                          value={pac.id}
                          checked={this.checkChecked(pac.id)}
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            this.setProjects(e)
                          }
                        />
                      </MDBListGroupItem>
                    );
                  })}
                </MDBListGroup>
              </div>
              <div className="text-right mb-4 mt-5">
                <MDBBtn
                  rounded
                  color="light-green"
                  type="button"
                  className="z-depth-2 btn-primary"
                  onClick={() => this.onSubmit()}
                >
                  Save
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBModalBody>
      </MDBModal>
    );
  }
}
//#endregion

//#region > Redux Mapping
const mapStateToProps = (state: RootState) => ({ ohrwurm: state.ohrwurm });

const mapDispatchToProps = {
  fetchPACS: fetchPACSAction,
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
  connect(mapStateToProps, mapDispatchToProps)(MemberModal)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
