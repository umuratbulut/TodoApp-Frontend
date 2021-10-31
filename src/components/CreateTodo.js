import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import Select from "react-select";
import Swal from "sweetalert2";

export default class CreateTodo extends Component {
  state = {
    users: [],
    name: "",
    user: "",
    loading: false,
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) =>
        data.map((d) => ({
          value: d.id,
          label: d.name + " " + d.surname + " • @" + d.nickname,
        }))
      )
      .then((q) => this.setState({ users: q }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let d = event.target.description.value.trim();
    let u = event.target.user.value;
    if (d === "" || u === "") {
      Swal.fire({
        position: "top-middle",
        icon: "info",
        html: "Please, fill in fields <b>Things To Do</b> and <b>Person To Do</b> ...!",
      });
    } else {
      this.setState({ loading: !this.state.loading });
      fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: d,
          userID: u,
        }),
      }).then((res) => {
        if (res.status === 200) {
          this.setState({ loading: !this.state.loading });
          Swal.fire({
            position: "top-middle",
            icon: "success",
            text: "Item successfully added.",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location = "/";
          });
        } else {
          Swal.fire({
            position: "top-middle",
            icon: "error",
            text: "ERROR: Item could not be deleted!",
          });
        }
      });
    }
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup style={{ marginTop: 10 }}>
                <Label style={{ marginBottom: 5 }}>Things To Do</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="write a task..."
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup style={{ marginTop: 10 }}>
                <Label style={{ marginBottom: 5 }}>Person To Do</Label>
                <Select name="user" options={this.state.users} />
              </FormGroup>
            </Col>
            <Col>
              <Button
                color="primary"
                type="submit"
                style={{ marginTop: 37, width: "100%" }}
                disabled={this.state.loading}
              >
                {!this.state.loading ? null : (
                  <Spinner style={{ width: "1rem", height: "1rem" }} children />
                )}{" "}
                Save ToDo
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
