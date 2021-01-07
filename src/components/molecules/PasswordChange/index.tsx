//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
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
//#endregion

//#region > Components
class PasswordChangeForm extends React.Component<
  {
    username: string | undefined;
    onSubmit: (newPassword: string) => void;
  },
  {}
> {
  state = {
    password: "",
    confirmPassword: "",
  };

  validPassword = () => {
    return (
      this.state.password !== "" &&
      this.state.confirmPassword !== "" &&
      this.state.password === this.state.confirmPassword
    );
  };

  submitHandler = (event: any) => {
    event.preventDefault();
    event.target.className += " was-validated";

    if (this.validPassword()) {
      this.props.onSubmit(this.state.password);
    }
  };

  changeHandler = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form
          className="needs-validation"
          onSubmit={this.submitHandler}
          noValidate
        >
          <MDBContainer>
            <MDBRow className="justify-content-center">
              <MDBCol md="6">
                <MDBCard>
                  <MDBCardBody className="mx-4 mt-4">
                    <p className="font-small grey-text d-flex justify-content-center">
                      Enter a new password for the user
                      <p className="dark-grey-text font-weight-bold ml-1">
                        {this.props.username}
                      </p>
                      .
                    </p>
                    <MDBInput
                      value={this.state.password}
                      name="password"
                      onChange={this.changeHandler}
                      type="password"
                      id="materialFormRegisterPasswordEx3"
                      label="New password"
                      required
                    >
                      <div className="invalid-feedback">
                        Please enter a valid password.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBInput>
                    <MDBInput
                      value={this.state.confirmPassword}
                      name="confirmPassword"
                      onChange={this.changeHandler}
                      type="password"
                      id="materialFormRegisterPasswordEx4"
                      label="Confirm new password"
                      required
                    >
                      <div className="invalid-feedback">
                        Please enter a valid password.
                      </div>
                      <div className="valid-feedback">Looks good!</div>
                    </MDBInput>
                    {(this.state.password === "" &&
                      this.state.confirmPassword === "") ||
                    this.validPassword() ? (
                      <></>
                    ) : (
                      <small className="text-danger">
                        The passwords entered do not match.
                      </small>
                    )}
                    <div className="text-center mb-4 mt-5">
                      <MDBBtn
                        color="light-green"
                        type="submit"
                        className="btn-block z-depth-2 btn-primary"
                      >
                        Change password
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </form>
      </div>
    );
  }
}
#endregion

#region > Exports
export default PasswordChangeForm;
#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020-2021 Nico Schett
 */
