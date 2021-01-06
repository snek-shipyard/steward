//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { useState } from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdbreact";
//#endregion

//#region > Components
const ServiceGroup = (props: {
  entries: { title: string; [key: string]: any }[];
  onSubmit: (index: number) => void;
}) => {
  // Declare a new state variable, which we'll call "count"
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody className="mx-4 mt-4">
              <MDBListGroup>
                {props.entries.map((e, index) => {
                  return (
                    <MDBListGroupItem
                      key={index}
                      active={index === activeItemIndex}
                      hover={index !== activeItemIndex}
                      onClick={() => setActiveItemIndex(index)}
                    >
                      {e.title}
                    </MDBListGroupItem>
                  );
                })}
              </MDBListGroup>
              <div className="text-center mb-4 mt-5">
                <MDBBtn
                  color="light-green"
                  type="button"
                  className="btn-block z-depth-2 btn-primary"
                  onClick={() => props.onSubmit(activeItemIndex)}
                >
                  Next
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
//#endregion

//#region > Exports
export default ServiceGroup;
//#endregion
