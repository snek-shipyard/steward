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
// Contains functionality to display time
import moment from "moment";
// Contains the functionality for tag inputs
import ReactTagInput from "@snek-shipyard/react-tag-input";

//> Store Types
import { RootState } from "../../../../store/reducers/index";
import {
  OhrwurmState,
  Track,
  TagType,
  Significance,
} from "../../../../store/types";
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
  audioFileUrl?: string;
  editing: boolean;
}
interface OwnProps {
  toggle: any;
  track: Track | undefined;
  addTrack: any;
  updateTrack: any;
  audioFile: any;
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
    audioFileUrl: "",
    editing: false,
  };

  componentWillMount = () => {
    if (this.props.track) {
      const {
        tags,
        title,
        createdAt,
        audioFile,
        description,
        attendees,
        audioFileUrl,
      } = this.props.track;

      this.setState({
        attendees: (attendees || []).map((attendee) => {
          return { name: attendee.name, significance: "LIGHT" };
        }),
        tags: (tags || []).map((tag) => {
          return {
            name: tag.name,
            significance: tag.significance.toUpperCase() as Significance,
          };
        }),
        title,
        description,
        createdAt,
        audioFile,
        audioFileUrl,
        editing: true,
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

    let attendeesList: { name: string }[] | undefined = (attendees || []).map(
      (attendee) => {
        return { name: attendee.name };
      }
    );

    if (this.state.editing) {
      const id = this.props.track?.id;

      if (title === this.props.track?.title) {
        title = undefined;
      }

      if (description === this.props.track?.description) {
        description = undefined;
      }

      if (tags === this.props.track?.tags) {
        tags = undefined;
      }

      const propsAttendeesList = this.props.track?.attendees?.map(
        (attendee) => {
          return { name: attendee.name };
        }
      );

      if (
        JSON.stringify(propsAttendeesList) === JSON.stringify(attendeesList)
      ) {
        attendeesList = undefined;
      }

      await this.props.updateTrack(
        (id || 0)?.toString(),
        title,
        attendeesList,
        description,
        tags
      );
    } else {
      await this.props.addTrack(
        this.props.ohrwurm.tracks?.pacId,
        title,
        attendeesList,
        audioFile,
        createdAt,
        description,
        tags
      );
    }

    this.setState({
      loading: false,
    });

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
                disabled={this.state.editing}
                className="input-track"
                label="Date"
                group
                type="date"
                validate
                value={moment(this.state.createdAt).format("YYYY-MM-DD")}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  this.setDate(e)
                }
              />
              <Dropzone
                onDrop={this.onDrop}
                accept="audio/*"
                disabled={this.state.editing}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {this.state.error.length > 0 ||
                    this.state.audioFile !== null ? (
                      <div className="text-center">
                        <ul className="list-group mt-2">
                          <li className="list-group-item list-group-item-success">
                            <MDBIcon
                              icon="cloud-upload-alt"
                              className="green-text"
                              size="3x"
                            />
                            <p className="lead mt-3 mb-0">
                              {this.state.audioFile
                                ? this.state.audioFile.name
                                : this.state.audioFileUrl}
                            </p>
                          </li>
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
              <label>Tags</label>
              <div className="tags">
                <ReactTagInput
                  tags={this.state.tags || []}
                  onChange={(tags: Tags) => this.setState({ tags })}
                  placeholder="Type and press enter"
                  editable={true}
                  readOnly={false}
                />
              </div>
              <br />
              <label>Attendees</label>
              <div className="attendees">
                <ReactTagInput
                  tags={this.state.attendees || []}
                  onChange={(attendees: Tags) => this.setState({ attendees })}
                  placeholder="Type and press enter"
                  editable={true}
                  readOnly={false}
                />
              </div>
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
 * Copyright © 2020-2021 Nico Schett
 */
