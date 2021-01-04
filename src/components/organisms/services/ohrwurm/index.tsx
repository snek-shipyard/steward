//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// DOM bindings for React Router
import { withRouter, RouteComponentProps } from "react-router-dom";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdbreact";
//> Redux
import { connect } from "react-redux";
// Contains the functionality for uploading a file
import Dropzone from "react-dropzone";

//> Store Types
import { RootState } from "../../../../store/reducers/index";
import { OhrwurmState, Track } from "../../../../store/types";
//> Store Actions
import {
  fetchPACSAction,
  fetchPACTracksAction,
} from "../../../../store/actions/ohrwurmActions";
//> Components
import { Breadcrumbs } from "../../../atoms";
import { ProjectTable, TrackTable } from "../../../molecules";
import { ProjectModal, TrackModal } from "../../modals";
//> Style Sheet
import "./ohrwurm.scss";
//#endregion

//#region > Types
type TableType = "PROJECT" | "TRACK";
//#endregion

//#region > Interfaces
interface State {
  activeTable: TableType;
  showTranscriptModal: boolean;
  transcriptTitle?: string;
  transcriptText: string;
  searchQuery?: string;
  selectedProjectIndex?: number;
  editingProject: boolean;
  projectModal: boolean;
  trackModal: boolean;
  selectedTrack: Track | undefined;
  error: Array<any>;
  file: any;
}
interface OwnProps {}
interface StateProps {
  ohrwurm: OhrwurmState;
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
class Ohrwurm extends React.Component<Props, State> {
  state: State = {
    activeTable: "PROJECT",
    showTranscriptModal: false,
    transcriptTitle: "",
    transcriptText: "",
    editingProject: false,
    projectModal: false,
    trackModal: false,
    selectedTrack: undefined,
    error: [],
    file: null,
  };

  componentDidMount = () => {
    console.log("MOUNT");
    this.props.fetchPACS();
  };

  switchTable = (table: TableType) => {
    console.log(table);
    this.setState({ activeTable: table });
  };

  selectProject = (index: number) => {
    console.log(this.state.editingProject, "XXXXXXXXXXXXXXXXXXX");
    if (!this.state.editingProject) {
      this.props.fetchPACTracks(index);
      this.setState({ selectedProjectIndex: index, searchQuery: "" });
      this.switchTable("TRACK");
    } else {
      this.setState({ editingProject: false });
    }
  };

  deleteProject = (index: number) => {
    this.setState({ selectedProjectIndex: index });
    this.state.editingProject = true;
  };

  editProject = (index: number) => {
    this.setState({ selectedProjectIndex: index });
    this.state.editingProject = true;
  };

  selectTrack = (track: Track) => {
    this.setState({
      transcriptTitle: track.title,
      transcriptText: track.transcript,
    });
    this.toggleTranscriptModal();
  };

  toggleTranscriptModal = () => {
    this.setState({
      showTranscriptModal: !this.state.showTranscriptModal,
    });
  };

  search = (value: string) => {
    this.setState({ searchQuery: value });

    if (this.state.activeTable === "TRACK" && this.state.selectedProjectIndex) {
      this.props.fetchPACTracks(this.state.selectedProjectIndex, value);
    }

    if (this.state.activeTable === "PROJECT") {
      this.props.fetchPACS(value);
    }
  };

  toggleProjectModal = () => {
    this.setState({
      projectModal: !this.state.projectModal,
    });
  };

  toggleTrackModal = () => {
    this.setState({
      trackModal: !this.state.trackModal,
    });
    if (this.state.trackModal) {
      this.setState({ selectedTrack: undefined });
    }
  };

  deleteTrack = (track: Track) => {
    console.log(track);
  };

  editTrack = (track: Track) => {
    this.setState({
      selectedTrack: track,
    });
    this.toggleTrackModal();
  };

  onDrop = async (files: any) => {
    if (files.length > 0) {
      this.setState({
        file: files[0],
        error: [],
      });

      this.toggleTrackModal();
    } else {
      this.setState({
        error: ["Only sound related file uploading is supported!"],
      });
    }
  };

  render() {
    const activeStyle = {
      borderColor: "#2196f3",
    };
    return (
      <>
        {this.state.activeTable === "PROJECT" ? (
          <Breadcrumbs
            crumbs={[
              { name: "Ohrwurm" },
              {
                name: "Projects",
                active: true,
              },
            ]}
          ></Breadcrumbs>
        ) : (
          <Breadcrumbs
            crumbs={[
              { name: "Ohrwurm" },
              {
                name: "Project",
                onClick: () => this.switchTable("PROJECT"),
              },
              {
                name: "Track",
                active: true,
              },
            ]}
          ></Breadcrumbs>
        )}
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
            {this.state.activeTable === "PROJECT" ? (
              <MDBBtn flat onClick={() => this.toggleProjectModal()}>
                <MDBIcon icon="plus" size="lg" className="blue-text" />
              </MDBBtn>
            ) : (
              <MDBBtn flat onClick={() => this.toggleTrackModal()}>
                <MDBIcon icon="upload" size="lg" className="blue-text" />
              </MDBBtn>
            )}
          </MDBCol>
        </MDBRow>

        <MDBContainer>
          <MDBModal
            isOpen={this.state.showTranscriptModal}
            toggle={this.toggleTranscriptModal}
            fullHeight
            position="left"
          >
            <MDBModalHeader toggle={this.toggleTranscriptModal}>
              <div className="row">
                <span className="dark-grey-text font-medium ml-3">
                  {truncate(this.state.transcriptTitle || "")}
                </span>
              </div>
              <a className="dark-grey-text font-small font-weight-bold ml-1">
                Transcript
              </a>
            </MDBModalHeader>
            <MDBModalBody className="modal-body">
              {this.state.transcriptText}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBIcon icon="snowman" />
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
        {this.state.activeTable === "PROJECT" ? (
          <ProjectTable
            entries={
              this.props.ohrwurm.pacs?.items
                ? this.props.ohrwurm.pacs.items
                : []
            }
            onClick={this.selectProject}
            onDeleteClick={this.deleteProject}
            onEditClick={this.editProject}
          ></ProjectTable>
        ) : (
          <>
            <ul className="list-group mt-2">
              {this.state.error.length > 0 &&
                this.state.error.map((error, i) => (
                  <li
                    className="list-group-item list-group-item-danger"
                    key={i}
                  >
                    <h3>{error}</h3>
                  </li>
                ))}
            </ul>
            <Dropzone
              onDrop={this.onDrop}
              accept="audio/*"
              noClick
              multiple={false}
            >
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <TrackTable
                    entries={
                      this.props.ohrwurm.tracks?.items
                        ? this.props.ohrwurm.tracks.items
                        : []
                    }
                    onTranscriptClick={this.selectTrack}
                    onDeleteClick={this.deleteTrack}
                    onEditClick={this.editTrack}
                  ></TrackTable>
                </div>
              )}
            </Dropzone>
          </>
        )}
        {this.state.projectModal && (
          <ProjectModal toggle={this.toggleProjectModal} />
        )}
        {this.state.trackModal && (
          <TrackModal
            file={this.state.file}
            toggle={this.toggleTrackModal}
            track={this.state.selectedTrack}
          />
        )}
      </>
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
  connect(mapStateToProps, mapDispatchToProps)(Ohrwurm)
);
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
