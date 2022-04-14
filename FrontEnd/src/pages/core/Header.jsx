import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/auth/auth-actions";
import { getUser } from "../../store/user/user-actions";
import { searchSuggestions } from "../../store/search/search-actions";
import { contentActions } from "../../store/content/content-slice";

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
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [showingResults, setShowingResults] = useState(false);
  const formRef = useRef();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    if(auth.jwtToken) {
      dispatch(getUser(auth.jwtToken));
    }
  }, [auth.jwtToken]);

  //Only for search suggestions
  const onSearch = (e) => {
    e.preventDefault();

    setShowingResults(true);
    setSearchValue(e.target.value);

    document.addEventListener("click", clickOutside, false);

    dispatch(
      searchSuggestions({
        search_query: e.target.value
      })
    )
  }

  const searchSubmit = (e, name) => {
    e.preventDefault();

    if(searchValue == "") {
      return;
    }

    let search = "";

    setShowingResults(false);

    if(name == "entered") {
      search = searchValue;
    } else {
      search = name.toLowerCase();
    }

    navigate("/SearchResults", { state: search, replace: true });
  }

  //When user hits the enter key
  const enterKey = (e) => {
    if(e.keyCode == 13) {
      searchSubmit(e, "entered");
    }
  }

  const clickOutside = (e) => {

    if (formRef.current && !formRef.current.contains(e.target)) {
      setShowingResults(false);
    }

    document.removeEventListener("click", clickOutside, false);
  }

  const closeSearch = (e, title) => {
    e.preventDefault();

    setShowingResults(false);
    setSearchValue(title);
  }

  //logout
  const clickSubmit = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  //Open modal
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

          <Form className="search-form" ref={formRef}>
            <Form.Control
              type="search"
              className="core-search-input"
              placeholder="Search"
              aria-label="Search"
              onKeyDown={enterKey}
              onChange={onSearch}
              value={searchValue}
            />
            <Button className="core-search-btn" onClick={(e) => searchSubmit(e, 'entered')}>
              <FaSearch size={28} />
            </Button>
            {
              showingResults && search.searchSuggestions.length > 0 && (
                <section id="search-results">
                  {
                    search.searchSuggestions.map((video, i) => {
                      return (
                        <div key={i} onClick={(e) => closeSearch(e, video.title)}>
                          <Link to="/searchresults" className="search-match" state={video.title}>{video.title}</Link>
                        </div>
                      )
                    })
                  }
                </section>
              )
            }
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
                      <Dropdown.Toggle variant="create" className="create-container">
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
                        user.id
                          ? "http://localhost:8080/user/avatar/" + user.id + "?" + new Date().getTime()
                          : "http://localhost:8080/user/defaultAvatar"
                      }
                      alt="avatar"
                    />
                  </Dropdown.Toggle>
 
                  <Dropdown.Menu className="main-dropdown">
                    <div className="dropdown-user">
                      <Image
                        className="dropdown-avatar"
                        src={
                          user.id
                            ? "http://localhost:8080/user/avatar/" + user.id + "?" + new Date().getTime()
                            : "http://localhost:8080/user/defaultAvatar"
                        }
                        alt="avatar"
                      />
                      <div>
                        <Link to={"/profile/" + auth.userIdLogin} className="core-username">{user.user?.username}</Link>
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
