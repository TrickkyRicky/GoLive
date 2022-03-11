import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import auth from "../../storage/auth-jwt";
import { logout } from "../../store/auth/auth-actions";
import { getUser } from "../../store/user/user-actions";

export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => {
    return {
      userId: state.auth.userIdLogin,
      isAuth: state.auth.isAuth,
      jwt: state.auth.jwtToken,
    };
  });
  const user = useSelector((state) => {
    return {
      username: state.user.username,
      avatar: state.user.avatar,
    };
  });

  useEffect(() => {
    if (auth.jwt) {
      dispatch(getUser(auth.jwt));
    }
  }, [dispatch, auth]);

  //logout
  const clickSubmit = (e) => {
    e.preventDefault();

    // auth.removeJWT();
    dispatch(logout());

    navigate("/", {
      replace: true,
    });
  };

  return (
    <header id="site-header">
      <Navbar bg="light" expand="md" sticky="top">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Go Live</Navbar.Brand>
          </LinkContainer>

          <Nav>
            {!auth.isAuth && (
              <Fragment>
                <Nav.Item>
                  <LinkContainer to="/auth/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </Nav.Item>

                <Nav.Item>
                  <LinkContainer to="/auth/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Fragment>
            )}
            {auth.isAuth && (
              <Dropdown align="end">
                <Dropdown.Toggle>
                  <Image
                    className="avatar"
                    src={
                      user.avatar
                        ? "http://localhost:8080/user/avatar/" +
                          auth.userId +
                          "?" +
                          new Date().getTime()
                        : "http://localhost:8080/user/defaultAvatar"
                    }
                    roundedCircle={true}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>{user.username}</Dropdown.Item>
                  <LinkContainer to="/settings">
                    <Dropdown.Item>Settings</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Button onClick={clickSubmit}>Logout</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}
