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
} from "reactstrap";
import Swal from "sweetalert2";
import { Formik } from "formik";
import * as Yup from "yup";
export default class SignUp extends Component {
  state = {
    loading: false,
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.signUpModalStatus} toggle={this.props.toggle}>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              userName: "",
              email: "",
              password: "",
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
              password: Yup.string()
                .min(8, "Must be at least 8 characters.")
                .required("Please enter your password."),
            })}
            onSubmit={(values, { resetForm }) => {
              this.setState({ loading: !this.state.loading });
              fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: values.name.trim(),
                  surname: values.surname.trim(),
                  nickname: values.userName.trim(),
                  email: values.email.toLowerCase().trim(),
                  password: values.password.trim(),
                }),
              }).then((res) => {
                this.setState({ loading: !this.state.loading });
                if (res.status === 200) {
                  Swal.fire({
                    position: "top-middle",
                    icon: "success",
                    text: "Registration successful, Please login.",
                  });
                  resetForm();
                } else {
                  Swal.fire({
                    position: "top-middle",
                    icon: "error",
                    text: "Registration failed..! , Please try again.",
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
                <ModalHeader toggle={this.props.toggle}>Sign up</ModalHeader>
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
                    <Row style={{ marginTop: 10 }}>
                      <FormGroup>
                        <Label style={{ marginBottom: 5 }}>Password</Label>
                        <Input
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                        ></Input>
                        {errors.password && touched.password && (
                          <span style={{ color: "red" }}>
                            {errors.password}
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
                    Sign up
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
