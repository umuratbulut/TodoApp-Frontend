import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

export default class UserList extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate() {
    this.getList();
  }

  getList = () => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }));
  };
  render() {
    return (
      <Modal isOpen={this.props.modalStatus} toggle={this.props.toggle} size="lg">
        <ModalHeader toggle={this.props.toggle}>Registered Users</ModalHeader>
        <ModalBody>
          <div style={{ width: "100%" }}>
            <Table>
              <thead>
                <tr>
                  <th width="25%">Name</th>
                  <th width="25%">Surname</th>
                  <th width="25%">User Name</th>
                  <th width="25%">E-Mail</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user) => (
                  <tr key={user.ID}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>@{user.nickname}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
