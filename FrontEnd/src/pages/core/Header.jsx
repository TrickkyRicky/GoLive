import React, { Fragment } from 'react';

//Bootstrap 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image'

import { LinkContainer } from 'react-router-bootstrap';
import auth from '../../storage/auth-jwt';

export default function Header() {
  return (
    <header id="site-header">
        <Navbar bg="light" expand="md" sticky="top">
        <Container fluid>
            <LinkContainer to="/">
                <Navbar.Brand>Go Live</Navbar.Brand>
            </LinkContainer>

            
            <Nav>
                {
                    !auth.isAuthenticated() && (
                        <Fragment>
                            <Nav.Item>
                                <LinkContainer to="/auth/login">
                                    <Nav.Link>
                                        Login
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>

                            <Nav.Item>
                                <LinkContainer to="/auth/register">
                                    <Nav.Link>
                                        Register
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Fragment>
                    )
                }
                {
                    auth.isAuthenticated() && (
                        <Dropdown>
                            <Dropdown.Toggle>
                                <Image className="avatar"
                                src={
                                    auth.isAuthenticated() ?
                                    'http://localhost:8080/user/avatar/' + auth.isAuthenticated() + '?' + new Date().getTime()
                                    : 'http://localhost:8080/user/avatar/defaultAvatar'
                                }
                                roundedCircle={true} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                }
            </Nav>

            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Offcanvas.Body>
            </Navbar.Offcanvas>

        </Container>
        </Navbar>
    </header>
  )
}
