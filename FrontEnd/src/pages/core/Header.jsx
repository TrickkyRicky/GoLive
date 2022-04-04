import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

import { Link, useLocation } from "react-router-dom";
import { logout } from "../../store/auth/auth-actions";
import { getUser } from "../../store/user/user-actions";
import { contentActions } from "../../store/content/content-slice";

import { Buffer } from "buffer";

//Assets
import logo from "../../assets/Logo.png";
import logoutIcon from "../../assets/right-from-bracket-solid.png";
import gearIcon from "../../assets/gear-solid.png";
import { FaSearch } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import { RiVideoAddFill } from 'react-icons/ri';
import { HiThumbUp } from 'react-icons/hi';
import { MdHeadsetMic } from 'react-icons/md';

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
 
  // console.log(location);

  useEffect(() => {
    if(auth.jwtToken) {
      dispatch(getUser(auth.jwtToken));
    }
  }, [auth.jwtToken]);

  //logout
  const clickSubmit = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  const openUpload = (e) => {
    e.preventDefault();

    dispatch(contentActions.showUploadModal(true)); 
  };

  return (
    <header id="site-header">
      <Container fluid>
        <Navbar className="justify-content-between">
          
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              className="d-inline-block align-top"
              alt="Go Live Logo"
            />
          </Navbar.Brand>

          <Form className="search-form">
            <Form.Control
              type="search"
              className="core-search-input"
              placeholder="Search"
              aria-label="Search"
            />
            <Button className="core-search-btn">
              <FaSearch size={28} />
            </Button>
          </Form>

          {
            !auth.isAuth && (
              <Nav className="auth-nav">
                <Nav.Item>
                  <Nav.Link as={Link} to="/auth/login" state={{ from: location.pathname }}>
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/auth/register" className="link-register">
                    Register
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            )
          }

          {
            auth.isAuth && (
              <Nav>
                <div className="nav-collection">
                  <Nav.Item>
                    <Dropdown align="end">
                      <Dropdown.Toggle className="create-container">
                        <RiVideoAddFill size={40} color={"#35C280"}/>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="create-dropdown">
                        <div className="button-stack">
                          <button type="button" className="dropdown-item">

                            <div className="icon-item">
                              <div className="icon-container">
                                <MdHeadsetMic size={18} color={"#f5f4f4"} />
                              </div>
                              <p className="core-text">
                                Stream
                              </p>
                            </div>

                          </button>
                          <button type="button" className="dropdown-item" onClick={openUpload}>

                            <div className="icon-item">
                              <div className="icon-container">
                                <FaUpload size={18} color={"#f5f4f4"} />
                              </div>
                              <p className="core-text">
                                Upload Video
                              </p>
                            </div>

                          </button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/liked" className="">
                      <HiThumbUp size={40} color={"#35C280"}/>
                    </Link>
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
 
                  <Dropdown.Menu className="main-dropdown">
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
                        <Link to={"/profile/" + auth.userIdLogin} className="core-username">{user.username}</Link>
                      </div>
                    </div>
                    <Link to="/settings" className="dropdown-item">
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
                    </Link>
                      <button type="button" onClick={clickSubmit} className="dropdown-item">
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
