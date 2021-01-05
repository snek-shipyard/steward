//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBDataTableV5,
  MDBIcon,
  MDBBadge,
  MDBChip,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdbreact";
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
    onTranscriptClick: (track: Track) => void;
    onDeleteClick: (track: Track) => void;
    onEditClick: (track: Track) => void;
  },
  {}
> {
  generateRows = () => {
    return this.props.entries.map((e) => {
      console.log(e);
      const {
        id,
        title,
        createdAt,
        tags,
        attendees,
        transcript,
        audioFileUrl,
      } = e;
      return {
        id,
        name: title,
        createdAt: moment(createdAt).calendar(),
        tags: (
          <>
            {tags?.map((tag) => (
              <MDBBadge
                pill
                color={tag.significance ? tag.significance : "LIGHT"}
                className="m-1 shadow-none"
              >
                <p className="mx-2 my-2">{tag.name}</p>
              </MDBBadge>
            ))}
          </>
        ),
        attendees: (
          <>
            {attendees?.map((attendee) => (
              <MDBChip className="m-1">{attendee.name}</MDBChip>
            ))}
          </>
        ),
        transcript: (
          <MDBBtn
            rounded
            outline
            color="primary"
            onClick={() => this.props.onTranscriptClick(e)}
          >
            <MDBIcon icon="file" /> Open
          </MDBBtn>
        ),
        audio: (
          <ReactPlayer
            url={audioFileUrl}
            width="100px"
            height="50px"
            playing={false}
            controls={true}
          />
        ),
        actions: (
          <MDBRow>
            <MDBCol size="2">
              <MDBIcon
                icon="pencil-alt"
                size="lg"
                onClick={() => this.props.onEditClick(e)}
              />
            </MDBCol>
            <MDBCol size="2">
              <MDBIcon
                icon="trash-alt"
                size="lg"
                onClick={() => this.props.onDeleteClick(e)}
              />
            </MDBCol>
          </MDBRow>
        ),
      };
    });
  };

  state = {
    columns: [
      {
        label: "Name",
        field: "name",
        width: 300,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Created date",
        field: "createdAt",
        width: 300,
      },
      {
        label: "Tags",
        field: "tags",
        width: 300,
      },
      {
        label: "Attendees",
        field: "attendees",
        width: 300,
      },
      {
        label: "Transcript",
        field: "transcript",
        width: 300,
        sort: "disabled",
      },
      {
        label: "Audio",
        field: "audio",
        width: 300,
        sort: "disabled",
      },
      {
        label: "Actions",
        field: "actions",
        width: 300,
        sort: "disabled",
      },
    ],
    rows: this.generateRows(),
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    console.log(prevProps, this.props);
    if (prevProps !== this.props) {
      this.setState({ rows: this.generateRows() });
    }
  }

  render() {
    return (
      <MDBDataTableV5
        hover
        scrollY
        searching={false}
        maxHeight="300px"
        data={this.state}
      />
    );
  }
}
//#endregion

//#region > Exports
export default TrackTable;
//#endregion
