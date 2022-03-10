import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { postLogin } from "../../store/auth/auth-actions";

const Login = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: "",
    error: "",
    redirect: false,
  });

  const handleChange = (event, field) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: values.username || undefined,
      password: values.password || undefined,
    };

    dispatch(postLogin(user.username, user.password)).then((data) => {
      if(data) {
        setValues({ ...values, error: '', redirect: true})
      }
    });
  };

  const { from } = location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirect } = values;

  if (redirect) {
    return <Navigate replace to={from} />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <Form className="auth-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => handleChange(e, "username")}
                />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> 
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e, "password")}
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={clickSubmit}>
                Submit
              </Button>
            </Form>
            <p>Don't have an account yet? <Link to="/auth/register">Register</Link>.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
