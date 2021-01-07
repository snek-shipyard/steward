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
import { OhrwurmState, PAC, Member } from "../../../../store/types";
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
  title?: string;
  description?: string;
  channelId?: string;
  members?: string[];
  searchQuery?: string;
  editing: boolean;
  filteredMembers?: Member[];
}
interface OwnProps {
  toggle: any;
  selectedProjectIndex?: string;
  addTrack: any;
  updateTrack: any;
}
interface StateProps {
  ohrwurm: OhrwurmState;
}
interface DispatchProps {
  // login: (user?: { username: string; password: string }) => void;
  fetchPACS: (searchQuery?: string) => void;
  fetchPACTracks: (pacId: string, searchQuery?: string) => void;
}
interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
//#endregion

//#region > Components
class ProjectModal extends React.Component<Props, State> {
  state: State = {
    title: "",
    description: "",
    channelId: "",
    members: [],
    searchQuery: "",
    editing: false,
    filteredMembers: [],
  };

  componentWillMount = () => {
    if (this.props.selectedProjectIndex) {
      const pac = this.props.ohrwurm.pacs?.items?.find(
        (pac) => pac.id === this.props.selectedProjectIndex
      );

      if (pac) {
        this.setState({
          title: pac?.title || "",
          description: pac?.description,
          channelId: pac?.channelId,
          members: pac?.members?.map((member) => {
            return member.username;
          }),
          editing: true,
        });
      }
    }

    this.setState({
      filteredMembers: this.props.ohrwurm.members?.items,
    });
  };

  setProjectName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ title: e.currentTarget.value });
  };

  setChannelId = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ channelId: e.currentTarget.value });
  };

  setDescription = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ description: e.currentTarget.value });
  };

  setMembers = (e: React.FormEvent<HTMLInputElement>): void => {
    let { members } = this.state;
    let member = e.currentTarget.value;

    if ((members || []).includes(member)) {
      members = members?.filter((f) => f !== member);
    } else {
      members?.push(member);
    }

    this.setState({ members });
  };

  search = (value: string) => {
    let filteredMembers = this.props.ohrwurm.members?.items || [];

    if (value !== "") {
      filteredMembers = filteredMembers.filter((member) =>
        member.username.toLowerCase().includes(value.toLowerCase())
      );
    }

    this.setState({ searchQuery: value, filteredMembers });
  };

  onSubmit = async () => {
    let { title, description, channelId, members } = this.state;

    if (this.state.editing) {
      const pac = this.props.ohrwurm.pacs?.items?.find(
        (e) => e.id === this.props.selectedProjectIndex
      );

      if (pac) {
        if (pac.title === title) {
          title = undefined;
        }
        if (pac.description === description) {
          description = undefined;
        }
        if (pac.channelId === channelId) {
          channelId = undefined;
        }

        await this.props.updateTrack(
          pac.id,
          title,
          description,
          channelId,
          members
        );
      }
    } else {
      await this.props.addTrack(title, description, channelId, members);
    }

    this.props.toggle();
  };

  checkChecked = (username: string) => {
    if (this.state.members?.includes(username)) {
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
        id="projectmodal"
      >
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
                value={this.state.title}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setProjectName(e)
                }
              />
              <MDBInput
                id="input"
                className="input-track"
                label="Channel ID"
                group
                type="text"
                validate
                value={this.state.channelId}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setChannelId(e)
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

              <label>Member</label>
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
                  {(this.state.filteredMembers || []).map((member, id) => {
                    return (
                      <MDBListGroupItem>
                        <MDBInput
                          type="checkbox"
                          id={id.toString()}
                          label={member.username}
                          value={member.username}
                          checked={this.checkChecked(member.username)}
                          onChange={(e: React.FormEvent<HTMLInputElement>) =>
                            this.setMembers(e)
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
 * Copyright © 2020-2021 Nico Schett
 */
