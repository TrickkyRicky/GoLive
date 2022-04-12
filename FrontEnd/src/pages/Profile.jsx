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

import { getUserProfile, getPopularUploads } from "../store/content/content-actions";
import { subscribe, unsubscribe } from "../store/user/user-actions";

import { Buffer } from "buffer";

const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();
 
  const profileState = useSelector((state) => state.content);

  const isSubscribed = useSelector((state) => state.content.subscribed);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getPopularUploads(userId, { views: 1 }));
  }, [userId]);

//   const handleSelect = (key) => {
//       if(key == "Home") {
//         dispatch(getPopularUploads(userId, { views: 1 }));
//       }
//   }

  const subscribeClick = (e) => {
    e.preventDefault();

    dispatch(subscribe(auth.jwtToken, profileState.userProfile._id));
  }

  const unsubscribeClick = (e) => {
    e.preventDefault();

    dispatch(unsubscribe(auth.jwtToken, profileState.userProfile._id));
  }

  return (
    <Container>
        <div className="channel-header">
            <Image className="channel-avatar" 
                src={
                profileState.userProfile?.avatar
                    ? `data:${profileState.userProfile.avatar.contentType};base64,${Buffer.from(
                        profileState.userProfile.avatar.data.data
                    ).toString("base64")}`
                    : "http://localhost:8080/user/defaultAvatar"
                }
                alt="thumbnail" />
            <div className="channel-info-container">
                <h2>
                    {profileState.userProfile?.username}
                </h2>
                <p className="channel-pill">
                    {profileState.userProfile?.subscribers.users.length} {profileState.userProfile?.subscribers.users.length == 1 ? "Subscriber" : "Subscribers"}
                </p>
                {
                    auth.isAuth && profileState.userProfile?._id != auth.userIdLogin && (
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
                        <h2>Popular Uploads</h2>
                        <div className="video-list">
                            {
                                profileState.popularUploads?.map((video, i) => {
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
                        <Tab.Pane eventKey="About">
                            <div>
                                <h2>Description</h2>
                                <p>
                                    {profileState.userProfile?.about}
                                </p>
                                <p>
                                    Total Views: {profileState.userProfile?.totalViews}
                                </p>
                            </div>
                            <div>
                                <div>
                                    <p>Joined {new Date(profileState.userProfile?.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Videos">
                            <div className="video-list">
                            {
                                profileState.userProfile?.media.videos.map((video, i) => {
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
