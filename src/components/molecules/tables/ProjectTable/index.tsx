//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtnGroup,
} from "mdbreact";
//> Data Table
import DataTable from "react-data-table-component";

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
      };
    });
  };

  state = {
    columns: [
      {
        name: "Name",
        selector: "name",
        sortable: true,
        grow: 0.2,
      },
      {
        name: "Description",
        selector: "description",
      },
      {
        name: undefined,
        // cell: (row: any) => <MDBIcon icon="ellipsis-v" />,
        cell: (e: any) => (
          <MDBBtnGroup>
            <MDBDropdown>
              <MDBDropdownToggle color="blue">
                <MDBIcon icon="ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu color="danger">
                <MDBDropdownItem onClick={() => this.props.onEditClick(e.id)}>
                  {"View"}
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={() => this.props.onDeleteClick(e.id)}>
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
        selectableRows
        onRowClicked={(e) => this.props.onClick(e.id)}
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
export default ProjectTable;
//#endregion
