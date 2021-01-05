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
class MemberTable extends React.Component<
  {
    members: [];
    onDeleteClick: (index: number) => void;
    onEditClick: (index: number) => void;
  },
  {}
> {
  generateRows = () => {
    return this.props.members.map((e) => {
      const { id, title } = e;

      return {
        id,
        name: title,
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
        maxHeight="100%"
        data={this.state}
      />
    );
  }
}
//#endregion

//#region > Exports
export default MemberTable;
//#endregion
