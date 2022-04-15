import React from "react";

//Bootstrap
import {Container, Row, Col, Tab} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

import Profile from "../components/settingPanes/Profile";
import Subscriptions from "../components/settingPanes/Subscriptions";
import Media from "../components/settingPanes/Media";

const Settings = () => {
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
