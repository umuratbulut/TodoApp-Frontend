import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { FaCheck, FaPencilAlt, FaTimes, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateTodo from "./UpdateTodo";

export default class TodoList extends Component {
  state = {
    todos: [],
    setModal: false,
    todoId: "",
    todoDesc: "",
    todoUser: "",
    todoUserLabel: "",
    todoCDate: "",
  };
  toggle = (id, desc, user, userLabel, date) => {
    this.setState({ setModal: !this.state.setModal });
    this.setState({
      todoId: id,
      todoDesc: desc,
      todoUser: user,
      todoUserLabel: userLabel,
      todoCDate: date,
    });
  };

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate() {
    this.getList();
  }

  getList = () => {
    fetch("http://localhost:5000/api/todos")
      .then((response) => response.json())
      .then((data) => this.setState({ todos: data }));
  };

  changeStatus = (id) => {
    fetch("http://localhost:5000/api/todos/" + id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  removeItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/api/todos", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ID: id,
          }),
        });

        Swal.fire({
          position: "top-middle",
          icon: "success",
          text: "Your ıtem has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Table>
          <thead>
            <tr>
              <th>Things To Do</th>
              <th>Person To Do</th>
              <th>Creation Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.todoID}>
                <td
                  style={{
                    opacity: todo.todoStatus ? null : "70%",
                    textDecoration: todo.todoStatus ? null : "line-through",
                  }}
                >
                  {todo.todoDescription}
                </td>
                <td
                  style={{
                    opacity: todo.todoStatus ? null : "70%",
                    textDecoration: todo.todoStatus ? null : "line-through",
                  }}
                >
                  {todo.userName} • @{todo.userNickname}
                </td>
                <td
                  style={{
                    opacity: todo.todoStatus ? null : "70%",
                    textDecoration: todo.todoStatus ? null : "line-through",
                  }}
                >
                  {todo.todoDate}
                </td>
                <td width="120">
                  <Button
                    color="primary"
                    size="sm"
                    style={{ display: todo.todoStatus ? null : "none" }}
                    onClick={() => this.changeStatus(todo.todoID)}
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    style={{ display: todo.todoStatus ? "none" : null }}
                    onClick={() => this.changeStatus(todo.todoID)}
                  >
                    <FaTimes />
                  </Button>
                  <Button
                    color="success"
                    size="sm"
                    style={{
                      marginLeft: 3,
                      display: todo.todoStatus ? null : "none",
                    }}
                    onClick={() =>
                      this.toggle(
                        todo.todoID,
                        todo.todoDescription,
                        todo.todoUserID,
                        todo.userName + " • @" + todo.userNickname,
                        todo.creationDate
                      )
                    }
                  >
                    <FaPencilAlt />
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => this.removeItem(todo.todoID)}
                    style={{
                      marginLeft: 3,
                      display: todo.todoStatus ? null : "none",
                    }}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <UpdateTodo
          modalStatus={this.state.setModal}
          toggle={this.toggle}
          id={this.state.todoId}
          description={this.state.todoDesc}
          user={this.state.todoUser}
          label={this.state.todoUserLabel}
          date={this.state.todoCDate}
        />
      </div>
    );
  }
}
