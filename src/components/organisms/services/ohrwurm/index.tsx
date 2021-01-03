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
import { TrackModal } from "../../modals";
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
  transcriptTitle: string;
  transcriptText: string;
  searchQuery?: string;
  selectedProjectIndex?: number;
  trackModal: boolean;
  selectedTrack: Track | undefined;
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
    trackModal: false,
    selectedTrack: undefined,
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
    this.props.fetchPACTracks(index);
    this.setState({ selectedProjectIndex: index, searchQuery: "" });
    this.switchTable("TRACK");
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
    console.log(this.state.searchQuery);
    console.log(this.state.activeTable);

    if (this.state.activeTable === "TRACK" && this.state.selectedProjectIndex) {
      this.props.fetchPACTracks(this.state.selectedProjectIndex, value);
    }

    if (this.state.activeTable === "PROJECT") {
      this.props.fetchPACS(value);
    }
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

  render() {
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
              <MDBBtn flat>
                <MDBIcon
                  icon="plus"
                  size="lg"
                  className="blue-text"
                  onClick={() => alert()}
                />
              </MDBBtn>
            ) : (
              <MDBBtn flat>
                <MDBIcon
                  icon="upload"
                  size="lg"
                  className="blue-text"
                  onClick={() => this.toggleTrackModal()}
                />
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
                  {truncate(this.state.transcriptTitle)}
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
          ></ProjectTable>
        ) : (
          <>
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
          </>
        )}
        {this.state.trackModal && (
          <TrackModal
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
