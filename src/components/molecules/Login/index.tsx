//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React, { useState } from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";

//> Mailing
import Mailto from "../../atoms/Mailto";
//> Stylesheet
import "./login.scss";
//#endregion

//#region > Components
const LoginForm = (props: {
  onSubmit: (username: string, password: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              {/* <div className="header pt-3 grey lighten-2">
                  <MDBRow className="d-flex justify-content-start">
                    <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5"></h3>
                  </MDBRow>
                </div> */}
              <MDBCardBody className="mx-4 mt-4">
                <MDBInput
                  id="input"
                  className="input-login"
                  label="Your username"
                  group
                  type="text"
                  validate
                  value={username}
                  onChange={(e: any) => setUsername(e.target.value)}
                />
                <MDBInput
                  className="input-login"
                  label="Your password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                <p className="font-small grey-text d-flex justify-content-end">
                  Forgot
                  <a
                    onClick={() => alert("Shit happens ¯\\_(ツ)_/¯")}
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Password?
                  </a>
                </p>
                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="light-green"
                    type="button"
                    className="btn-block z-depth-2 btn-primary"
                    onClick={() => props.onSubmit(username, password)}
                  >
                    Log in
                  </MDBBtn>
                </div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                  <Mailto
                    email="foo@bar.baz"
                    subject="Hello & Welcome"
                    body="Hello world!"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    {" "}
                    Contact a supervisor
                  </Mailto>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
//#endregion

//#region > Exports
export default LoginForm;
//#endregion
