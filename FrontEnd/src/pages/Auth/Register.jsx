import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Modal, Image } from "react-bootstrap";
import { postRegister } from "../../store/auth/auth-actions";

import logo from "../../assets/Logo.png";

const Register = (props) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    error: ''
  });

  const [modalShow, setModalShow] = useState(false);

  const handleChange = (event, field) => {
    setValues({ ...values, [field]: event.target.value })
  }

  const handleModalClose = () => setModalShow(false);

  const clickSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: values.username || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }

    //dispatch
    dispatch(postRegister(user.username, user.email, user.password)).then((data) => {
      if(data) {
        setValues({
          username: '',
          email: '',
          password: ''
        });

        setModalShow(true);
      }
    });

  } 

  return (
    <Container fluid>
    <Row>
      <Col>
        <div className="auth-form-centered register">
          <div className="auth-form-container">
            <Link to="/">
              <Image className="golive-logo" src={logo} alt="Go Live logo"/>
            </Link>
            <div className="auth-content">
              <Form className="auth-form">

                <Form.Group className="form-group" controlId="formBasicName">
                  <Form.Label className="visually-hidden">Username</Form.Label>
                  <Form.Control type="text" placeholder="USERNAME" onChange={e => handleChange(e, 'username')} value={values.username} />

                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicEmail">
                  <Form.Label className="visually-hidden">Email</Form.Label>
                  <Form.Control type="email" placeholder="EMAIL" onChange={e => handleChange(e, 'email')} value={values.email} />

                </Form.Group>

                <Form.Group className="form-group" controlId="formBasicPassword">
                  <Form.Label className="visually-hidden">Password</Form.Label>
                  <Form.Control type="password" placeholder="PASSWORD" onChange={e => handleChange(e, 'password')} value={values.password} />

                </Form.Group>
                <Button className="login-btn" type="submit" onClick={clickSubmit}>
                  SIGN UP
                </Button>
              </Form>
              <p className="auth-text"><Link to="/auth/login">Already have an account?</Link></p>
            </div>
          </div>
        </div>
      </Col>
      <Col>
        <div className="auth-background">
          <Image alt="random image"/>
        </div>
      </Col>

      <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Successful Sign Up
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                You can now login!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/auth/login" className="btn btn-success">
                Login
              </Link>
              <Button onClick={handleModalClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </Row>
    </Container>
  );
};

export default Register;
