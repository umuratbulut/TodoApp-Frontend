import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaInfoCircle } from "react-icons/fa";
export default class UpdateUser extends Component {
  state = {
    loading: false,
    alert: false,
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalStatus} toggle={this.props.toggle}>
          <Formik
            initialValues={{
              name: this.props.user.name,
              surname: this.props.user.surname,
              userName: this.props.user.nickname,
              email: this.props.user.email,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(2, "Must be at least 2 characters.")
                .required("Please enter your name."),
              surname: Yup.string()
                .min(2, "Must be at least 2 characters.")
                .required("Please enter your surname."),
              userName: Yup.string()
                .min(2, "Must be at least 2 characters.")
                .required("Please enter your user name."),
              email: Yup.string()
                .email("Please enter a valid e-mail address")
                .required("Please enter your e-mail address."),
            })}
            onSubmit={(values, { resetForm }) => {
              this.setState({ loading: !this.state.loading });

              fetch("http://localhost:5000/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ID: this.props.user.id,
                  name: values.name.trim(),
                  surname: values.surname.trim(),
                  nickname: values.userName.toLowerCase().trim(),
                  email: values.email.toLowerCase().trim(),
                  password: this.props.user.password,
                  passwordSalt: this.props.user.passwordSalt,
                  registrationDate: this.props.user.registrationDate,
                }),
              }).then((res) => {
                this.setState({ loading: !this.state.loading });

                if (res.status === 200) {
                  Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    html: "Your profile has been updated. <p><b>Please, login again...</b></p>",
                    showConfirmButton: false,
                    timer: 3000,
                  }).then(() => {
                    sessionStorage.clear();
                    window.location = "/";
                  });
                } else {
                  Swal.fire({
                    position: "top-middle",
                    icon: "error",
                    text: "ERROR: Your profile could not be updated!",
                  });
                }
              });
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              handleReset,
              dirty,
              touched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={this.props.toggle}>My Profile</ModalHeader>
                <ModalBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label style={{ marginBottom: 5 }}>Name</Label>
                        <Input
                          name="name"
                          style={{ width: 200 }}
                          value={values.name}
                          onChange={handleChange}
                        ></Input>
                        {errors.name && touched.name && (
                          <span style={{ color: "red" }}>{errors.name}</span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label style={{ marginBottom: 5 }}>Surname</Label>
                        <Input
                          name="surname"
                          style={{ width: 200 }}
                          value={values.surname}
                          onChange={handleChange}
                        ></Input>
                        {errors.surname && touched.surname && (
                          <span style={{ color: "red" }}>{errors.surname}</span>
                        )}
                      </FormGroup>
                    </Col>
                    <Row style={{ marginTop: 10 }}>
                      <FormGroup>
                        <Label style={{ marginBottom: 5 }}>User Name</Label>
                        <Input
                          name="userName"
                          value={values.userName}
                          onChange={handleChange}
                        ></Input>
                        {errors.userName && touched.userName && (
                          <span style={{ color: "red" }}>
                            {errors.userName}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                      <FormGroup>
                        <Label style={{ marginBottom: 5 }}>E-Mail</Label>
                        <Input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        ></Input>
                        {errors.email && touched.email && (
                          <span style={{ color: "red" }}>{errors.email}</span>
                        )}
                      </FormGroup>
                    </Row>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    style={{ width: "100%" }}
                    disabled={this.state.loading}
                  >
                    {!this.state.loading ? null : (
                      <Spinner
                        style={{ width: "1rem", height: "1rem" }}
                        children
                      />
                    )}{" "}
                    Save Changes
                  </Button>{" "}
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>

        {/* Chance Modal */}

        <Modal isOpen={this.props.changeModal} toggle={this.props.changeToggle}>
          <Formik
            initialValues={{
              prePassword: "",
              newPassword: "",
            }}
            validationSchema={Yup.object({
              prePassword: Yup.string().required(
                "Please enter your previous password."
              ),
              newPassword: Yup.string()
                .min(8, "Must be at least 8 characters.")
                .required("Please enter your new password."),
            })}
            onSubmit={(values, { resetForm }) => {
              this.setState({ loading: !this.state.loading });

              fetch(
                "http://localhost:5000/api/users/" + values.newPassword.trim(),
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ID: this.props.user.id,
                    password: values.prePassword.trim(),
                  }),
                }
              ).then((res) => {
                this.setState({ loading: !this.state.loading });

                if (res.status === 200) {
                  this.setState({ alert: false });
                  resetForm();
                  Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    html: "Your password has been updated. <p><b>Please, login again...</b></p>",
                    showConfirmButton: false,
                    timer: 3000,
                  }).then(() => {
                    sessionStorage.clear();
                    window.location = "/";
                  });
                } else {
                  this.setState({ alert: !this.state.alert });
                }
              });
            }}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              handleReset,
              dirty,
              touched,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <ModalHeader toggle={this.props.changeToggle}>
                  Change Password
                </ModalHeader>
                <ModalBody>
                  <Row>
                    {this.state.alert ? (
                      <FormGroup>
                        <Alert color="danger">
                          <FaInfoCircle /> Previous password is incorrect..!
                        </Alert>
                      </FormGroup>
                    ) : null}
                    <Row>
                      <FormGroup>
                        <Label style={{ marginBottom: 5 }}>
                          Previous Password
                        </Label>
                        <Input
                          name="prePassword"
                          type="password"
                          value={values.prePassword}
                          onChange={handleChange}
                        ></Input>
                        {errors.prePassword && touched.prePassword && (
                          <span style={{ color: "red" }}>
                            {errors.prePassword}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                    <Row>
                      <FormGroup>
                        <Label style={{ marginBottom: 5, marginTop: 10 }}>
                          New Password
                        </Label>
                        <Input
                          name="newPassword"
                          type="password"
                          value={values.newPassword}
                          onChange={handleChange}
                        ></Input>
                        {errors.newPassword && touched.newPassword && (
                          <span style={{ color: "red" }}>
                            {errors.newPassword}
                          </span>
                        )}
                      </FormGroup>
                    </Row>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    style={{ width: "100%" }}
                    disabled={this.state.loading}
                  >
                    {!this.state.loading ? null : (
                      <Spinner
                        style={{ width: "1rem", height: "1rem" }}
                        children
                      />
                    )}{" "}
                    Save Changes
                  </Button>{" "}
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
