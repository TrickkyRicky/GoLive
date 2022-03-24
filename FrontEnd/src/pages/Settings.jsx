import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//Bootstrap
import {Container, Row, Col, Tabs, Tab, Sonnet} from "react-bootstrap";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import editIcon from "../assets/edit.svg"

import { getUser, updateUser } from "../store/user/user-actions";

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
    let value = (field == 'avatar') ? e.target.files[0] : e.target.value;

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
              <Nav.Item className="settings-navbar-item">
                <Nav.Link eventKey="profile" className="settings-navbar-link">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item className="settings-navbar-item">
                <Nav.Link eventKey="subscriptions" className="settings-navbar-link">Subscriptions</Nav.Link>
              </Nav.Item>
              <Nav.Item className="settings-navbar-item">
                <Nav.Link eventKey="media" className="settings-navbar-link">Media</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <p className="settings-tab-pane">Profile Tab</p>
              </Tab.Pane>
              <Tab.Pane eventKey="subscriptions">
                <p className="settings-tab-pane">Subscriptions Tab</p>
              </Tab.Pane>
              <Tab.Pane eventKey="media">
                <p className="settings-tab-pane">Media Tab</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>        
      </Tab.Container>
      <Row>
        <Col></Col>
        <Col xs={8} className="form-background">
          <Row>
            <Col></Col>
            <Col xs={8} className="pt-5">
              <Form>
                <Row>
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Name </div>
                      <Image className="edit-icon" src={editIcon} alt="Edit Icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Username</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Username </div>
                      <Image className="edit-icon" src={editIcon} alt="Edit Icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Password </div>
                      <Image className="edit-icon" src={editIcon} alt="Edit Icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
                <Row className="mt-3 mb-5">
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Email</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Email</div>
                      <Image className="edit-icon" src={editIcon} alt="Edit Icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
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
    </Container>
  );
};

export default Settings;
