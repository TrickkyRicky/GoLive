import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { postRegister } from "../../store/auth/auth-actions";

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
    <Container>
      <Row>
        <Col>
          <div>
            <Form className="auth-form">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" onChange={e => handleChange(e, 'username')} value={values.username} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => handleChange(e, 'email')} value={values.email} />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => handleChange(e, 'password')} value={values.password} />

              </Form.Group>

              <Button variant="primary" type="submit" onClick={clickSubmit}>
                Submit
              </Button>
            </Form>
            <p>Already have an account? <Link to="/auth/login">Login</Link>.</p>
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
