import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { postLogin } from "../../store/auth/auth-actions";

import logo from "../../assets/Logo.png";

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
        setValues({ 
          ...values, 
          error: '', 
          redirect: true
        })
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
    <Container fluid>
      <Row>
        <Col>
          <div className="auth-background">
            <Image alt="random image"/>
          </div>
        </Col>
        <Col>
          <div className="auth-form-centered login">
            <div className="auth-form-container">
              <Link to="/">
                <Image className="golive-logo" src={logo} alt="Go Live logo"/>
              </Link>
              <div className="auth-content">
                <Form className="auth-form">
                  <Form.Group className="form-group" controlId="formBasicEmail">
                    <Form.Label className="visually-hidden">Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="USERNAME"
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </Form.Group>

                  <Form.Group className="form-group" controlId="formBasicPassword">
                    <Form.Label className="visually-hidden">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="PASSWORD"
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </Form.Group>

                  <Button className="login-btn" type="submit" onClick={clickSubmit}>
                    LOGIN
                  </Button>
                </Form>
                <p className="auth-text"><Link to="/auth/register">Forgot Password</Link>.</p>
                <p className="auth-text"><Link to="/auth/register">Create Account</Link>.</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
