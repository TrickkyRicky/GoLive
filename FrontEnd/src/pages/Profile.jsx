import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

import { getUserProfile } from "../store/content/content-actions";
import { subscribe, unsubscribe } from "../store/user/user-actions";

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

  const isSubscribed = useSelector((state) => state.content.subscribed);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [userId]);

  const subscribeClick = (e) => {
    e.preventDefault();

    dispatch(subscribe(auth.jwtToken, profileState.profile._id));
  }

  const unsubscribeClick = (e) => {
    e.preventDefault();

    dispatch(unsubscribe(auth.jwtToken, profileState.profile._id));
  }

  return (
    <Container>
        <div className="channel-header">
            <Image className="channel-avatar" 
                src={
                profileState.profile?.avatar
                    ? `data:${profileState.profile.avatar.contentType};base64,${Buffer.from(
                        profileState.profile.avatar.data.data
                    ).toString("base64")}`
                    : "http://localhost:8080/user/defaultAvatar"
                }
                alt="thumbnail" />
            <div className="channel-info-container">
                <h2>
                    {profileState.profile?.username}
                </h2>
                <p className="channel-pill">
                    {profileState.profile?.subscribers.users.length} {profileState.profile?.subscribers.users.length == 1 ? "Subscriber" : "Subscribers"}
                </p>
                {
                    auth.isAuth && profileState.profile?._id != auth.userIdLogin && (
                    <div>
                        {
                            isSubscribed ? (
                                <button type="button" className="channel-subscribe-btn" onClick={unsubscribeClick}>
                                    Unsubscribe
                                </button>
                            ) : (
                                <button type="button" className="channel-subscribe-btn" onClick={subscribeClick}>
                                    Subscribe
                                </button>
                            )
                        }
                    </div>
                    )
                }
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
                            <div className="video-list">
                            {
                                profileState.profile?.media.videos.map((video, i) => {
                                    return (
                                        <div key={i} className="video-item">
                                            <div className="video-overlay">
                                                <Link to={"/watch/" + video._id}>
                                                    <Image className="video-thumbnail" 
                                                        src={
                                                        video.thumbnail
                                                            ? `data:${video.thumbnail.contentType};base64,${Buffer.from(
                                                                video.thumbnail.data.data
                                                            ).toString("base64")}`
                                                            : "http://localhost:8080/user/defaultAvatar"
                                                        }
                                                    alt="thumbnail" />
                                                </Link>
                                            </div> 
                                            <div className="video-item-body">
                                                <Link to={"/Watch/" + video._id}>
                                                    <h5 className="video-title">{video.title}</h5>
                                                </Link>
                                                <div className="video-details">
                                                    <div className="video-views">
                                                        {video.views} views
                                                    </div>
                                                    <div className="video-timestamp">
                                                        {new Date(video.createdAt).toDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>    
      </Tab.Container>
    </Container>
  );
};

export default Profile;
