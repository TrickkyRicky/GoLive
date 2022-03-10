import React from 'react';

//Bootstrap 
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header() {
  return (
    <header id="site-header">
        <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
            <LinkContainer to="/">
                <Navbar.Brand>Go Live</Navbar.Brand>
            </LinkContainer>

            <Nav>
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
                    <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                        Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
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
