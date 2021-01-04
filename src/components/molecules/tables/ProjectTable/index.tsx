//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBDataTableV5, MDBRow, MDBCol, MDBIcon } from "mdbreact";

//> Store Types
import { PAC } from "../../../../store/types";
//#endregion

//#region > Components
class ProjectTable extends React.Component<
  {
    entries: PAC[];
    onClick: (index: string) => void;
    onDeleteClick: (index: string) => void;
    onEditClick: (index: string) => void;
  },
  {}
> {
  generateRows = () => {
    return this.props.entries.map((e) => {
      const { id, title, description } = e;

      return {
        id,
        name: title,
        description,
        actions: (
          <MDBRow>
            <MDBCol size="2">
              <MDBIcon
                icon="pencil-alt"
                size="lg"
                onClick={() => this.props.onEditClick(e.id)}
              />
            </MDBCol>
            <MDBCol size="2">
              <MDBIcon
                icon="trash-alt"
                size="lg"
                onClick={() => this.props.onDeleteClick(e.id)}
              />
            </MDBCol>
          </MDBRow>
        ),
        clickEvent: () => this.props.onClick(e.id),
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
        label: "Description",
        field: "description",
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
export default ProjectTable;
//#endregion
