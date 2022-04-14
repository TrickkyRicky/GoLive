import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import {Container, Row, Col, Image, Nav, Tab} from "react-bootstrap";

import { getUserProfile, getPopularUploads } from "../store/content/content-actions";
import { subscribe, unsubscribe } from "../store/user/user-actions";

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import userProfilePicture from '../assets/CourageJD.jpg'

const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();
 
  const content = useSelector((state) => state.content);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile(userId));
    dispatch(getPopularUploads(userId, { views: 1 }));
  }, [userId]);

  const subscribeClick = (e) => {
    e.preventDefault();

    dispatch(subscribe(auth.jwtToken, content.userProfile._id));
  }

  const unsubscribeClick = (e) => {
    e.preventDefault();

    dispatch(unsubscribe(auth.jwtToken, content.userProfile._id));
  }

  return (
    <Container>
        <Row className="channel-header">
            <Col></Col>
            <Col xs={2} sm={6} md={7} lg={8} xl={8} xxl={8} xtl={8}>
                <div className="channel-profile-picture">
                    <Image className="channel-avatar" 
                        src={userProfilePicture}
                        alt="avatar"
                    />
                </div>
                <div className="channel-info-container">
                    <div className="user-info">CourageJD</div>
                    <div className="user-info">325k Subscribers</div>
                    <div className="subscribe-pill">
                        <div>
                            <button className="button px-5">
                                Subscribe <FontAwesomeIcon className="star-icon" icon={faStar}/>
                            </button>
                        </div>
                    </div>
                </div>
            </Col>
            <Col></Col>
        </Row>
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
                                content.popularUploads?.map((video, i) => {
                                    return (
                                        <div key={i} className="video-item">
                                            <div className="video-overlay">
                                                <Link to={"/watch/" + video._id}>
                                                    <Image className="video-thumbnail" 
                                                        src={
                                                            video._id
                                                                ? "http://localhost:8080/content/thumbnail/" + video._id
                                                                : "http://localhost:8080/content/defaultThumbnail"
                                                        }
                                                        alt="thumbnail"
                                                    />
                                                </Link>
                                            </div> 
                                            <div className="video-item-body">
                                                <Link to={"/watch/" + video._id}>
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
                                    {content.userProfile?.about}
                                </p>
                                <p>
                                    Total Views: {content.userProfile?.totalViews}
                                </p>
                            </div>
                            <div>
                                <div>
                                    <p>Joined {new Date(content.userProfile?.createdAt).toDateString()}</p>
                                </div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="Videos">
                            <div className="video-list">
                            {
                                content.userProfile?.media.videos.map((video, i) => {
                                    return (
                                        <div key={i} className="video-item">
                                            <div className="video-overlay">
                                                <Link to={"/watch/" + video._id}>
                                                    <Image className="video-thumbnail" 
                                                        src={
                                                            video._id
                                                                ? "http://localhost:8080/content/thumbnail/" + video._id
                                                                : "http://localhost:8080/content/defaultThumbnail"
                                                        }
                                                        alt="thumbnail"
                                                    />
                                                </Link>
                                            </div> 
                                            <div className="video-item-body">
                                                <Link to={"/watch/" + video._id}>
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


/*<h2>
    {content.userProfile?.username}
</h2>
<p className="channel-pill">
    {content.userProfile?.subscribers.users.length} {content.userProfile?.subscribers.users.length == 1 ? "Subscriber" : "Subscribers"}
</p>
{
    auth.isAuth && content.userProfile?._id != auth.userIdLogin && (
    <div>
        {
            content.subscribed ? (
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
}*/ 
