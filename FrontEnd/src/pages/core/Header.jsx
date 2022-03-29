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
import { logout } from "../../store/auth/auth-actions";
// import { getUser } from "../../store/user/user-actions";
import { contentActions } from "../../store/content/content-slice";

import { Buffer } from "buffer";

//Assets
import logo from "../../assets/Logo.png";
import videoCamera from "../../assets/video-plus-svgrepo-com.svg";
import logoutIcon from "../../assets/right-from-bracket-solid.png";
import gearIcon from "../../assets/gear-solid.png";
import { FaSearch } from 'react-icons/fa';
import { RiVideoAddFill } from 'react-icons/ri';

export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
 
  console.log(user);

  //logout
  const clickSubmit = (e) => {
    e.preventDefault();

    // auth.removeJWT();
    dispatch(logout());

    navigate("/", {
      replace: true,
    });
  };

  const openUpload = (e) => {
    e.preventDefault();

    dispatch(contentActions.showUploadModal(true)); 
  };

  return (
    <header id="site-header">
      <Container fluid>
        <Navbar className="justify-content-between">
          
          <LinkContainer to="/">
            <Navbar.Brand>
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="Go Live Logo"
            />
            </Navbar.Brand>
          </LinkContainer>

          <Form className="search-form">
            <Form.Control
              type="search"
              placeholder="Search"
              className="core-search-input"
              aria-label="Search"
            />
            <Button className="core-search-btn">
              <FaSearch size={20} />
            </Button>
          </Form>

          {
            !auth.isAuth && (
              <Nav className="auth-nav">
                <Nav.Item>
                  <LinkContainer to="/auth/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </Nav.Item>

                <Nav.Item>
                  <LinkContainer to="/auth/register">
                    <Nav.Link className="link-register">Register</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              </Nav>
            )
          }

          {
            auth.isAuth && (
              <Nav>
                <div className="nav-collection">
                  <Nav.Item>
                    <Button onClick={openUpload}>
                      <RiVideoAddFill size={40} color={"#35C280"}/>
                    </Button>
                  </Nav.Item>
                </div>

                <Dropdown align="end">
                  <Dropdown.Toggle className="avatar-container">
                    <Image
                      className="avatar"
                      src={
                        user.avatar
                          ? `data:${user.avatar.contentType};base64,${Buffer.from(
                              user.avatar.data.data
                            ).toString("base64")}`
                          : "http://localhost:8080/user/defaultAvatar"
                      }
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="main-dropout">
                    <div className="dropdown-user">
                      <Image
                        className="dropdown-avatar"
                        src={
                          user.avatar
                            ? `data:${user.avatar.contentType};base64,${Buffer.from(
                                user.avatar.data.data
                              ).toString("base64")}`
                            : "http://localhost:8080/user/defaultAvatar"
                        }
                      />
                      <div>
                        <h2 className="core-username">{user.username}</h2>
                      </div>
                    </div>
                    <LinkContainer to="/settings">
                      <Dropdown.Item>
                        <div className="icon-item">
                          <div className="icon-container">
                            <Image
                              src={gearIcon}
                            />
                          </div>
                          <p className="core-text">
                            Settings
                          </p>
                        </div>
                      </Dropdown.Item>
                    </LinkContainer>
                    <Dropdown.Divider />
                      <button type="button" onClick={clickSubmit} className="btn-logout">
                        <div className="icon-item">
                          <div className="icon-container">
                            <Image
                              className="logout-icon"
                              src={logoutIcon}
                            />
                          </div>
                          <p className="core-text">
                            Logout
                          </p>
                        </div>
                      </button>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Nav>
            )
          }

          
      </Navbar>
      </Container>
    </header>
  );
}
