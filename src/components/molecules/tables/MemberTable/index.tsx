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
} from "mdbreact";
//> Data Table
import DataTable from "react-data-table-component";

//> Store Types
import { Member } from "../../../../store/types";
//#endregion

//#region > Components
class MemberTable extends React.Component<
  {
    entries?: Member[];
    onDeleteClick: (index: string) => void;
    onEditClick: (index: string) => void;
  },
  {}
> {
  generateRows = () => {
    return (this.props.entries || []).map((e) => {
      const { id, username, isOhrwurmSupervisor } = e;

      return {
        id,
        username,
        isOhrwurmSupervisor,
      };
    });
  };

  state = {
    columns: [
      {
        name: "Username",
        selector: "username",
        sortable: true,
        grow: 0.2,
      },
      {
        name: "Supervisor",
        cell: (e: any) => e.isOhrwurmSupervisor && <MDBIcon icon="check" />,
      },
      {
        name: undefined,
        cell: (e: any) => (
          <MDBBtnGroup>
            <MDBDropdown>
              <MDBDropdownToggle color="white">
                <MDBIcon icon="ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu color="danger">
                <MDBDropdownItem
                  onClick={() => this.props.onEditClick(e.username)}
                >
                  {"Edit"}
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem
                  onClick={() => this.props.onDeleteClick(e.username)}
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
export default MemberTable;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
