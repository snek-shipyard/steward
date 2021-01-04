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
  MDBIcon,
  MDBProgress,
} from "mdbreact";
//> Redux
import { connect } from "react-redux";
// Contains the functionality for uploading a file
import Dropzone from "react-dropzone";
// Contains the functionality for tag inputs
import { TagInput } from "reactjs-tag-input";
//import { Tag } from "react-tag-input";
import ReactTagInput from "@snek-shipyard/react-tag-input";
//> Store Types
import { RootState } from "../../../../store/reducers/index";
import { OhrwurmState, Track, TagType } from "../../../../store/types";
//> Store Actions
import {
  fetchPACSAction,
  fetchPACTracksAction,
} from "../../../../store/actions/ohrwurmActions";

//> Style Sheet
import "./trackmodal.scss";
//#endregion

//#region > Types
type Tags = TagType[];
//#endregion

//#region > Interfaces
interface State {
  loading: boolean;
  error: Array<any>;
  attendees?: Tags;
  tags?: Tags;
  title?: string;
  description?: string;
  createdAt?: Date;
  audioFile?: any;
}
interface OwnProps {}
interface StateProps {
  ohrwurm: OhrwurmState;
  toggle: any;
  track: Track | undefined;
  addTrack: any;
  audioFile: any;
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
class TrackModal extends React.Component<Props, State> {
  state: State = {
    loading: false,
    error: [],
    attendees: [],
    tags: [],
    title: "",
    description: "",
    createdAt: new Date(),
    audioFile: null,
  };

  componentWillMount = () => {
    if (this.props.track) {
      const track = this.props.track;
      const { tags, title, createdAt, audioFile, description } = track;

      this.setState({
        attendees: (track.attendees || []).map((attendee) => {
          return { name: attendee.name, significance: "LIGHT" };
        }),
        tags,
        title,
        description,
        createdAt,
        audioFile,
      });
    }

    if (this.props.audioFile) {
      this.setState({
        audioFile: this.props.audioFile,
      });
    }
  };

  setTrackName = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ title: e.currentTarget.value });
  };

  setDescription = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ description: e.currentTarget.value });
  };

  setDate = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ createdAt: new Date(e.currentTarget.value) });
  };

  getDisplayDate = (date: Date) => {
    let dateString: string = "";
    date
      .toLocaleDateString()
      .split("/")
      .reverse()
      .map((part: string) => {
        if (part.length < 2) {
          part = "0" + part;
        }
        dateString += part + "-";
      });
    return dateString.slice(0, -1);
  };

  onDrop = async (files: any) => {
    let audioFile = files[0];

    this.setState({ audioFile });
  };

  onSubmit = async () => {
    this.setState({ loading: true });
    let {
      title,
      attendees,
      audioFile,
      createdAt,
      description,
      tags,
    } = this.state;

    let res = await this.props.addTrack(
      this.props.ohrwurm.tracks?.pacId,
      title,
      (attendees || []).map((attendee) => {
        return attendee.name;
      }),
      audioFile,
      createdAt,
      description,
      tags
    );

    this.setState({ loading: false });
    this.props.toggle();
  };

  render() {
    return (
      <MDBModal isOpen={true} toggle={this.props.toggle} size="lg">
        <MDBModalBody>
          {this.state.loading && (
            <MDBProgress
              material
              value={100}
              animated
              height="25px"
              color="success"
              className="mb-0 pb-0"
            >
              Uploading file
            </MDBProgress>
          )}
          <MDBRow>
            <MDBCol>
              <MDBInput
                id="input"
                className="input-track"
                label="Track name"
                group
                type="text"
                validate
                value={this.state.title}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setTrackName(e)
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
              <MDBInput
                id="input"
                className="input-track"
                label="Date"
                group
                type="date"
                validate
                value={this.getDisplayDate(this.state.createdAt || new Date())}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setDate(e)
                }
              />
              <Dropzone onDrop={this.onDrop} accept="audio/*">
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {this.state.error.length > 0 || acceptedFiles.length > 0 ? (
                      <div className="text-center">
                        <ul className="list-group mt-2">
                          {acceptedFiles.length > 0 &&
                            acceptedFiles.map((acceptedFile, i) => (
                              <li
                                className="list-group-item list-group-item-success"
                                key={i}
                              >
                                <MDBIcon
                                  icon="cloud-upload-alt"
                                  className="green-text"
                                  size="3x"
                                />
                                <p className="lead mt-3 mb-0">
                                  {acceptedFile.name}
                                </p>
                              </li>
                            ))}
                        </ul>
                        {this.state.loading && (
                          <MDBProgress
                            material
                            value={100}
                            animated
                            height="25px"
                            color="success"
                            className="mb-0 pb-0"
                          >
                            Uploading file
                          </MDBProgress>
                        )}
                        <ul className="list-group mt-2">
                          {this.state.error.length > 0 &&
                            this.state.error.map((error, i) => (
                              <li
                                className="list-group-item list-group-item-danger"
                                key={i}
                              >
                                <MDBIcon
                                  icon="times"
                                  className="danger-text"
                                  size="6x"
                                />
                                <p />
                                <h3>{error}</h3>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="border rounded px-4 pt-4 pb-3 clickable text-center">
                        <MDBIcon
                          icon="cloud-upload-alt"
                          className="green-text"
                          size="3x"
                        />
                        <p className="lead mt-3 mb-0">
                          Click here or drop a file to upload!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              <br />
              <label>Attendees</label>
              <span id="attendees">
                <ReactTagInput
                  tags={this.state.attendees || []}
                  onChange={(attendees: Tags) => this.setState({ attendees })}
                  placeholder="Type and press enter"
                  editable={true}
                  readOnly={false}
                />
              </span>
              <br />
              <label>Tags</label>
              <span id="tags">
                <ReactTagInput
                  tags={this.state.tags || []}
                  onChange={(tags: Tags) => this.setState({ tags })}
                  placeholder="Type and press enter"
                  editable={true}
                  readOnly={false}
                />
              </span>
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="light-green"
                  type="button"
                  className="btn-block z-depth-2 btn-primary"
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
  connect(mapStateToProps, mapDispatchToProps)(TrackModal)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
