//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtnGroup,
  MDBBadge,
  MDBContainer,
} from "mdbreact";
//> Data Table
import DataTable from "react-data-table-component";
//> Audio Player
import ReactPlayer from "react-player";
//> Moment
import moment from "moment";

//> Store Types
import { Track } from "../../../../store/types";
//#endregion

//#region > Compnents
class TrackTable extends React.Component<
  {
    entries: Track[];
    modify?: boolean;
    onTranscriptClick: (track: Track) => void;
    onDeleteClick: (track: Track) => void;
    onEditClick: (track: Track) => void;
  },
  {}
> {
  generateRows = () => {
    return this.props.entries.map((e) => {
      const {
        id,
        title,
        description,
        createdAt,
        tags,
        attendees,
        transcript,
        audioFileUrl,
      } = e;

      return {
        id,
        title,
        description,
        createdAt,
        tags,
        attendees,
        transcript,
        audioFileUrl,
      };
    });
  };

  state = {
    columns: [
      {
        name: "Name",
        selector: "title",
        sortable: true,
        grow: 0.5,
      },
      {
        name: "Created date",
        selector: "createdAt",
        sortable: true,
        grow: 0.5,
        cell: (e: any) => {
          return <span>{moment(e.createdAt).calendar()}</span>;
        },
      },
      {
        name: "Tags",
        selector: "tags",
        cell: (e: any) => (
          <MDBContainer>
            {e.tags?.map((tag: any) => (
              <MDBBadge
                pill
                color={
                  tag.significance ? tag.significance.toLowerCase() : "light"
                }
                className="m-1 shadow-none"
              >
                <p className="mx-2 my-2">{tag.name}</p>
              </MDBBadge>
            ))}
          </MDBContainer>
        ),
      },
      {
        name: "Attendees",
        selector: "attendees",
        cell: (e: any) => (
          <MDBContainer>
            {e.attendees?.map((attendee: any) => (
              <MDBBadge pill color={"light"} className="m-1 shadow-none">
                <p className="mx-2 my-2">{attendee.name}</p>
              </MDBBadge>
            ))}
          </MDBContainer>
        ),
      },
      {
        name: "Audio",
        selector: "audio",
        cell: (e: any) => (
          <ReactPlayer
            url={e.audioFileUrl}
            height="50px"
            playing={false}
            controls={true}
          />
        ),
      },
      {
        name: undefined,
        cell: (e: any) => (
          <MDBBtnGroup>
            <MDBDropdown>
              <MDBDropdownToggle color="white">
                <MDBIcon icon="ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu color="special">
                <MDBDropdownItem disabled>Play</MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => this.props.onTranscriptClick(e)}
                >
                  {"Show transcript"}
                </MDBDropdownItem>
                <MDBDropdownItem
                  hidden={this.props.modify ? false : true}
                  onClick={() => this.props.onEditClick(e)}
                >
                  {"Edit"}
                </MDBDropdownItem>
                <MDBDropdownItem href={e.audioFileUrl} download>
                  Download
                </MDBDropdownItem>
                <MDBDropdownItem
                  divider
                  hidden={this.props.modify ? false : true}
                />
                <MDBDropdownItem
                  hidden={this.props.modify ? false : true}
                  onClick={() => this.props.onDeleteClick(e)}
                >
                  <MDBIcon
                    className="red-text pr-3"
                    icon="trash"
                    color="danger"
                  />
                  {" Delete"}
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBBtnGroup>
        ),
        allowOverflow: true,
        button: true,
        width: "120px", // custom width for icon button
      },
    ],
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps !== this.props) {
      this.setState({ rows: this.generateRows() });
    }
  }

  render() {
    return (
      <DataTable
        noHeader
        columns={this.state.columns}
        data={this.generateRows()}
        highlightOnHover
        defaultSortField="name"
        overflowY
        pagination
      />
    );
  }
}
//#endregion

//#region > Exports
export default TrackTable;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019-2020 Nico Schett
 */
