//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";

//> Stylesheet
import "./breadcrumbs.scss";
//#endregion

//#region > Components
const Breadcrumbs = (props: {
  crumbs: { name: string; active?: boolean; onClick?: () => void }[];
}) => {
  return (
    <MDBBreadcrumb>
      {props.crumbs.map((e, index) =>
        !e.active ? (
          <MDBBreadcrumbItem key={index}>
            <a href="#" onClick={() => (e.onClick ? e.onClick() : undefined)}>
              {e.name}
            </a>
          </MDBBreadcrumbItem>
        ) : (
          <MDBBreadcrumbItem active key={index}>
            {e.name}
          </MDBBreadcrumbItem>
        )
      )}
    </MDBBreadcrumb>
  );
};
//#endregion

//#region > Exports
export default Breadcrumbs;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
