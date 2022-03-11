import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

import { getUser, updateUser } from "../store/user/user-actions";

const Settings = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return {
      username: state.user.username,
      email: state.user.email,
      avatar: state.user.avatar,
    };
  });

  const [values, setValues] = useState({
    username: '',
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
    values.email && updatedUser.append('email', values.email);
    values.password && updatedUser.append('password', values.password);
    values.avatar && updatedUser.append('avatar', values.avatar);

    dispatch(updateUser(props.jwt, updatedUser))
  }

  useEffect(() => {
    if (props.jwt) {
      dispatch(getUser(props.jwt));
    }
  }, []);

  return (
    <Container>
      <Row>
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
      </Row>
    </Container>
  );
};

export default Settings;
