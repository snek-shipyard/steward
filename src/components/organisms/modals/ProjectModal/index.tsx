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
import { OhrwurmState, Track } from "../../../../store/types";
//> Store Actions
import {
  fetchPACSAction,
  fetchPACTracksAction,
} from "../../../../store/actions/ohrwurmActions";
//> Style Sheet
import "./projectmodal.scss";
//#endregion

//#region > Interfaces
interface State {
  projectName: string;
  description: string;
  searchQuery?: string;
}
interface OwnProps {}
interface StateProps {
  ohrwurm: OhrwurmState;
  toggle: any;
}
interface DispatchProps {
  // login: (user?: { username: string; password: string }) => void;
  fetchPACS: (searchQuery?: string) => void;
  fetchPACTracks: (pacId: number, searchQuery?: string) => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Functions
const truncate = (input: string) =>
  input.length > 5 ? `${input.substring(0, 25)}...` : input;
//#endregion

//#region > Components
class ProjectModal extends React.Component<Props, State> {
  state: State = {
    projectName: "Test project name",
    description: "This is a description for a project!!!",
    searchQuery: "",
  };

  setProjectName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ projectName: e.currentTarget.value });
  };

  setDescription = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ description: e.currentTarget.value });
  };

  search = (value: string) => {
    this.setState({ searchQuery: value });

    // Add search for users
  };

  render() {
    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
          <MDBRow>
            <MDBCol>
              <MDBInput
                id="input"
                className="input-track"
                label="Project name"
                group
                type="text"
                validate
                value={this.state.projectName}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setProjectName(e)
                }
              />
              <MDBInput
                id="input"
                className="input-track"
                label="Description"
                group
                type="textarea"
                validate
                value={this.state.description}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setDescription(e)
                }
              />

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
                  <MDBListGroupItem>
                    <MDBInput
                      type="checkbox"
                      id="checkbox1"
                      label="David Pinterics"
                    />
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <MDBInput
                      type="checkbox"
                      id="checkbox3"
                      label="David Pinterics"
                    />
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <MDBInput
                      type="checkbox"
                      id="checkbox2"
                      label="David Pinterics"
                    />
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <MDBInput type="checkbox" id="checkbox4" label="Hugo" />
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                    <MDBInput
                      type="checkbox"
                      id="checkbox5"
                      label="TESTTSTST"
                    />
                  </MDBListGroupItem>
                </MDBListGroup>
              </div>
              <div className="text-right mb-4 mt-5">
                <MDBBtn
                  rounded
                  color="light-green"
                  type="button"
                  className="z-depth-2 btn-primary"
                  onClick={() => alert()}
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
  fetchPACTracks: fetchPACTracksAction,
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
  connect(mapStateToProps, mapDispatchToProps)(ProjectModal)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
