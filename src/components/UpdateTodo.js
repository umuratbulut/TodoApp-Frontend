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
  Spinner
} from "reactstrap";
import Select from "react-select";
import Swal from "sweetalert2";
export default class UpdateTodo extends Component {
  state = {
    users: [],
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID: this.props.id,
          description: event.target.description.value,
          userID: event.target.user.value,
          creationDate: this.props.date,
        }),
      }).then((res) => {
        this.setState({ loading: !this.state.loading });

        if (res.status === 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            text: "Item successfully updated.",
            showConfirmButton: false,
            timer: 1500,
          }).then(()=>{
            window.location="/";
          });
        } else {
          Swal.fire({
            position: "top-middle",
            icon: "error",
            text: "ERROR: Item could not be updated!",
          });
        }
      });
    }
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modalStatus} toggle={this.props.toggle}>
          <Form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.props.toggle}>Update To Do</ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label style={{ marginBottom: 5 }}>Things To Do</Label>
                    <Input
                      name="description"
                      defaultValue={this.props.description}
                    ></Input>
                  </FormGroup>
                  <FormGroup style={{ marginTop: 10 }}>
                    <Label style={{ marginBottom: 5 }}>Person To Do</Label>
                    <Select
                      name="user"
                      options={this.state.users}
                      defaultValue={{
                        label: this.props.label,
                        value: this.props.user,
                      }}
                    ></Select>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit" disabled={this.state.loading}>
              {!this.state.loading?null:<Spinner style={{ width: '1rem', height: '1rem'}} children/>} Save changes
              </Button>{" "}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}
