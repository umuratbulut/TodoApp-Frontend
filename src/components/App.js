import React, { Component } from "react";
import CreateTodo from "./CreateTodo";
import Navi from "./Navi";
import { BrowserRouter, Switch } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap";
import TodoList from "./TodoList";
import UserList from "./UserList";
import SignUp from "./SignUp";
import { FaInfoCircle } from "react-icons/fa";
import UpdateUser from "./UpdateUser";
import { Formik } from "formik";
import * as Yup from "yup";

export default class App extends Component {
  state = {
    userModal: false,
    singUpModal: false,
    updateUserModal: false,
    loginModal: false,
    changeModal: false,
    loading: false,
    login: false,
    store: null,
    userData: null,
    loginError: false,
  };

  toggle = () => {
    this.setState({ userModal: !this.state.userModal });
  };

  signUpToggle = () => {
    this.setState({ singUpModal: !this.state.singUpModal });
  };

  loginToggle = () => {
    this.setState({ loginModal: !this.state.loginModal });
  };

  updateUserToggle = () => {
    this.setState({ updateUserModal: !this.state.updateUserModal });
  };

  changeToggle = () => {
    this.setState({ changeModal: !this.state.changeModal });
  };

  componentDidMount() {
    if (sessionStorage.getItem("login") !== null) {
      this.storeCollector();
    }
  }

  storeCollector = () => {
    let store = JSON.parse(sessionStorage.getItem("login"));
    let data = store.data;
    if (store && store.login) {
      this.setState({ login: true, store: store, userData: data });
    }
  };

  logout = () => {
    sessionStorage.clear();
    window.location = "/";
  };

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Row>
            <Navi
              userModalStatus={this.toggle}
              signUpModalStatus={this.signUpToggle}
              loginModalStatus={this.loginToggle}
              updateUserModal={this.updateUserToggle}
              loginStatus={this.state.login}
              logout={this.logout}
              user={this.state.userData}
              changeModal={this.changeToggle}
            />
          </Row>

          {this.state.login ? (
            <Row
              style={{
                border: "1px solid #d3d3d3",
                paddingBottom: 10,
                marginTop: 10,
              }}
            >
              <CreateTodo />
            </Row>
          ) : null}

          {this.state.login ? (
            <Row
              style={{
                border: "1px solid #d3d3d3",
                paddingBottom: 10,
                marginTop: 10,
              }}
            >
              <TodoList />
            </Row>
          ) : (
            <Row
              style={{
                border: "1px solid #d3d3d3",
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                marginTop: 10,
              }}
            >
              <Alert color="danger">
                <FaInfoCircle /> Please, login to view and add tasks.
              </Alert>
            </Row>
          )}

          {this.state.login ? (
            <UserList modalStatus={this.state.userModal} toggle={this.toggle} />
          ) : null}

          {this.state.login ? (
            <UpdateUser
              modalStatus={this.state.updateUserModal}
              toggle={this.updateUserToggle}
              user={this.state.userData}
              changeModal={this.state.changeModal}
              changeToggle={this.changeToggle}
            />
          ) : null}

          <SignUp
            signUpModalStatus={this.state.singUpModal}
            toggle={this.signUpToggle}
          />

          {/* Login Modal */}
          <Modal isOpen={this.state.loginModal} toggle={this.loginToggle}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Please enter a valid e-mail address.")
                  .required("Please enter your e-mail address. "),
                password: Yup.string().required("Please enter your password."),
              })}
              onSubmit={(values, { resetForm }) => {
                this.setState({ loading: !this.state.loading });
                fetch("http://localhost:5000/api/users/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: values.email.toLowerCase().trim(),
                    password: values.password.trim(),
                  }),
                }).then((response) => {
                  response.json().then((result) => {
                    if (result !== false) {
                      sessionStorage.setItem(
                        "login",
                        JSON.stringify({
                          login: true,
                          data: result,
                        })
                      );
                      this.storeCollector();
                      this.setState({ loginModal: !this.state.loginModal });
                    } else {
                      resetForm();
                      this.setState({ loginError: true });
                    }
                  });
                  this.setState({ loading: !this.state.loading });
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
                  <ModalHeader toggle={this.loginToggle}>Login</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col>
                        {this.state.loginError ? (
                          <Alert color="danger">
                            <FaInfoCircle /> Email or Password is incorrect...
                          </Alert>
                        ) : null}
                        <FormGroup>
                          <Label style={{ marginBottom: 5 }}>E-Mail</Label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="example@example.com"
                            value={values.email}
                            onChange={handleChange}
                          ></Input>
                          {errors.email && touched.email && (
                            <span style={{ color: "red" }}>{errors.email}</span>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <Label style={{ marginBottom: 5, marginTop: 10 }}>
                            Password
                          </Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder="********"
                            value={values.password}
                            onChange={handleChange}
                          ></Input>
                          {errors.password && touched.password && (
                            <span style={{ color: "red" }}>
                              {errors.password}
                            </span>
                          )}
                        </FormGroup>
                      </Col>
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
                      Login
                    </Button>{" "}
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Modal>

          <Switch>
            {/* <Route path="/users" component={UserList} exact /> */}
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
