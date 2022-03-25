import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

import { getUserProfile } from "../store/content/content-actions";

import { Buffer } from "buffer";

const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();

  const profileState = useSelector((state) => {
      return {
          loader: state.content.profileLoader,
          profile: state.content.userProfile
      }
  });

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [userId]);

  return (
    <Container>
        <div>
            <div className="d-flex">
                <div>
                    <Image className="video-thumbnail" 
                        src={
                        profileState.profile?.avatar
                            ? `data:${profileState.profile.avatar.contentType};base64,${Buffer.from(
                                profileState.profile.avatar.data.data
                            ).toString("base64")}`
                            : "http://localhost:8080/user/defaultAvatar"
                        }
                        alt="thumbnail" />
                </div>
                <div>
                    <div>
                        <h1>{profileState.profile?.username}</h1>
                    </div>
                    <div>
                        <p>{profileState.profile?.subscribers.users.length} Subscribers</p>
                    </div>
                    <div>
                        <Button>Subscribe</Button>
                    </div>
                </div>
            </div>
        </div>
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
                            Home
                        </Tab.Pane>
                        <Tab.Pane eventKey="About">
                            <div>
                                <h2>Description</h2>
                                <p>
                                    {profileState.profile?.about}
                                </p>
                            </div>
                            <div>
                                <div>
                                    <p>Joined {new Date(profileState.profile?.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Videos">
                            <ListGroup>
                                {
                                    profileState.profile?.media.videos.map((video, i) => {
                                        return (
                                            <Link to={"/watch/" + video._id} key={i}>
                                                <ListGroup.Item>
                                                    <Card>
                                                        <Image className="" 
                                                        src={
                                                        video.thumbnail
                                                            ? `data:${video.thumbnail.contentType};base64,${Buffer.from(
                                                                video.thumbnail.data.data
                                                            ).toString("base64")}`
                                                            : "http://localhost:8080/user/defaultAvatar"
                                                        }
                                                        alt="thumbnail" />
                                                        <Card.Body>
                                                            <Card.Title>{video.title}</Card.Title>
                                                            <Card.Text>{video.views} Views</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </ListGroup.Item>
                                            </Link>
                                        )
                                    })
                                }
                            </ListGroup>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>        
      </Tab.Container>
    </Container>
  );
};

export default Profile;
