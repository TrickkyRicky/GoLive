import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Bootstrap
import {Container, Row, Col, Nav, Tab} from "react-bootstrap";
import { getUserProfile, getPopularUploads } from "../store/content/content-actions";

//Assets
import  Home  from '../components/channelPagePanes/Home';
import About from '../components/channelPagePanes/About';
import Videos from '../components/channelPagePanes/Videos';
import ChannelHeader from "../components/channelPagePanes/ChannelHeader";

const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getPopularUploads(userId, { views: 1 }));
  }, [userId, dispatch]);

  return (
    <Container>
        <ChannelHeader />
        <Tab.Container defaultActiveKey="Home">       
            <Row>
                <Col>
                    <Nav variant="tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="Home" className="settings-navbar-link">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="About" className="settings-navbar-link">About</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="Videos" className="settings-navbar-link">Videos</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>    
            <Row>
                <Col>
                    <Tab.Content>
                        <Tab.Pane eventKey="Home">
                            <Home />
                        </Tab.Pane>
                        <Tab.Pane eventKey="About">
                            <About />
                        </Tab.Pane>
                        <Tab.Pane eventKey="Videos">
                            <Videos />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>    
      </Tab.Container>
    </Container>
  );
};

export default Profile;
