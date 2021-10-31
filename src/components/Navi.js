import React, { Component } from "react";
import { FaCaretDown, FaCog, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
export default class Navi extends Component {
  render() {
    return (
      <div>
        <Row>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/" style={{ marginLeft: "20px" }}>
              TODO'S APP
            </NavbarBrand>

            <Collapse navbar>
              <Nav className="ms-auto" navbar>
                {this.props.loginStatus ? (
                  <NavItem>
                    <NavLink href="#" onClick={this.props.userModalStatus}>
                      Users
                    </NavLink>
                  </NavItem>
                ) : null}

                {this.props.loginStatus ? (
                  <UncontrolledDropdown
                    setActiveFromChild
                    style={{
                      border: "1px solid grey",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    <DropdownToggle
                      style={{ color: "white" }}
                      tag="a"
                      className="nav-link"
                    >
                      <em>Welcome,</em>{" "}
                      {this.props.user.name + " " + this.props.user.surname}{" "}
                      <FaCaretDown />
                    </DropdownToggle>
                    <DropdownMenu style={{ width: "100%", marginTop: 3 }}>
                      <DropdownItem
                        tag="a"
                        href="#"
                        onClick={this.props.updateUserModal}
                      >
                        <FaUserEdit fontSize="14" /> My Profile
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="#"
                        onClick={this.props.changeModal}
                      >
                        <FaCog fontSize="14" /> Change Password
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        href="#"
                        onClick={this.props.logout}
                      >
                        <FaSignOutAlt fontSize="14" /> Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <Nav>
                    <NavItem>
                      <NavLink href="#" onClick={this.props.loginModalStatus}>
                        Login
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink href="#" onClick={this.props.signUpModalStatus}>
                        Sign up
                      </NavLink>
                    </NavItem>
                  </Nav>
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </Row>
      </div>
    );
  }
}
