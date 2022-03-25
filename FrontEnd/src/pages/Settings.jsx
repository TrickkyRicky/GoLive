import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//Bootstrap
import {Container, Row, Col, Tab} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'

import { getUser, updateUser } from "../store/user/user-actions";
import Profile from "../components/settingPanes/Profile";
import Subscriptions from "../components/settingPanes/Subscriptions";
import Media from "../components/settingPanes/Media";


const Settings = (props) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    avatar: ''
  });

  const handleChange = (e, field) => {
    let value = (field === 'avatar') ? e.target.files[0] : e.target.value;

    setValues({
      ...values,
      [field]: value
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    let updatedUser = new FormData();
    values.username && updatedUser.append('username', values.username);
    values.fullname && updatedUser.append('fullname', values.fullname);
    values.email && updatedUser.append('email', values.email);
    values.password && updatedUser.append('password', values.password);
    values.avatar && updatedUser.append('avatar', values.avatar);

    dispatch(updateUser(props.jwt, updatedUser))
  }

  useEffect(() => {
    if (props.jwt) {
      dispatch(getUser(props.jwt)).then((data) => {
        setValues({
          ...values,
          username: data.username,
          email: data.email
        })
      });
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col><h1 className='settings-title mb-5 pt-5'> Settings </h1></Col>
      </Row>
      <Tab.Container defaultActiveKey="profile">       
        <Row>
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="profile" className="settings-navbar-link">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="subscriptions" className="settings-navbar-link">Subscriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="media" className="settings-navbar-link">Media</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Profile />
              </Tab.Pane>
              <Tab.Pane eventKey="subscriptions">
                <Subscriptions />
              </Tab.Pane>
              <Tab.Pane eventKey="media">
                <Media />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>        
      </Tab.Container>
    </Container>
  );
};

export default Settings;

{/* <Row>
        <Col>
          <Form className="auth-form">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" onChange={(e) => handleChange(e, 'avatar')}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={(e) => handleChange(e, "username")}
                value={values.username}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={(e) => handleChange(e, "email")}
                value={values.email}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
                value={values.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={clickSubmit}>
              Update
            </Button>
          </Form>
        </Col>
      </Row> */}
