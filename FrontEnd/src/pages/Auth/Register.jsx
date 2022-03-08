import React, { useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Register = (props) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    error: ''
  });

  const handleChange = (event, field) => {
    setValues({ ...values, [field]: event.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: values.username || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }

    console.log(user)

    // create(user).then((data) => {
    //   if (data.error) {
    //     setValues({ ...values, error: data.error})
    //   } else {
    //     setValues({ ...values, error: ''})
    //   }
    // })

  } 

  return (
    <Container>
      <Row>
        <Col>
          <Form className="auth-form">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={e => handleChange(e, 'username')} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => handleChange(e, 'email')} />

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => handleChange(e, 'password')} />

            </Form.Group>

            <Button variant="primary" type="submit" onClick={clickSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
