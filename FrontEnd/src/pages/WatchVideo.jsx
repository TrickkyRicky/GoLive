import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';

import { getSingleVideo, getOtherVideos, getVideoComments } from "../store/content/content-actions";
import { likeVideo, unlikeVideo, postComment, deleteComment, subscribe, unsubscribe } from "../store/user/user-actions";

import ReactPlayer from "react-player";
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const WatchVideo = () => {
  const location = useLocation();
  
  const [values, setValues] = useState({
    comment: ''
  });

  const dispatch = useDispatch();
  let { videoId } = useParams();

  const videoInfo = useSelector((state) => state.content.videoInfo);
  const otherVideos = useSelector((state) => state.content.otherVideos);
  const isSubscribed = useSelector((state) => state.content.subscribed);
  const liked = useSelector((state) => state.content.liked);

  const videoComments = useSelector((state) => state.content.comments);

  const user = useSelector((state) => state.user); 

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getVideoComments(videoId));
    dispatch(getOtherVideos(videoId));
  }, [videoId]);

  const handleChange = (e, field) => {
    setValues({
      ...values,
      [field]: e.target.value
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    dispatch(postComment(auth.jwtToken, values.comment, videoId));

    setValues({
      ...values,
      comment: ''
    });
  }

  const likeClick = (e) => {
    e.preventDefault();

    dispatch(likeVideo(auth.jwtToken, videoId));
  }

  const unlikeClick = (e) => {
    e.preventDefault();

    dispatch(unlikeVideo(auth.jwtToken, videoId));
  }

  const subscribeClick = (e) => {
    e.preventDefault();

    dispatch(subscribe(auth.jwtToken, videoInfo.userId._id));
  }

  const unsubscribeClick = (e) => {
    e.preventDefault();

    dispatch(unsubscribe(auth.jwtToken, videoInfo.userId._id));
  }

  const deleteCommentClick = (e, comment) => {
    e.preventDefault();

    dispatch(deleteComment(auth.jwtToken, comment._id));
  }

  const mediaUrl = videoInfo?._id ? "http://localhost:8080/content/watch/" + videoInfo._id : null

  return (
    <Container>
        <div>
            <div className="player-wrapper">
              <ReactPlayer className="react-player" url={mediaUrl} width="100%" height="100%" controls/>
            </div>
            <Container>
              <Row>
                <Col>
                  <div className="primary-info">
                    <div className="top-level">
                      <div className="video-category">{ videoInfo?.category }</div>
                      <h1 className="video-title">{ videoInfo?.title }</h1>
                    </div>
                    <div className="primary-actions">
                      <div className="video-views-count">
                        { videoInfo?.views } {videoInfo?.views == 1 ? "View" : "Views" }
                      </div>
                      <div className="like-video">
                        {
                          auth.isAuth && (
                            <div className="like-btn-wrapper">
                              {
                                liked ? (
                                  <Button variant="like" onClick={unlikeClick}>
                                    <AiFillLike size={16} /> Unlike
                                  </Button>
                                ) : (
                                  <Button variant="like" onClick={likeClick}>
                                    <AiOutlineLike size={16} /> Like
                                  </Button>
                                )
                              }
                            </div>
                          )
                        }
                        <div className="video-likes-count">
                          { videoInfo?.likes.length } {videoInfo?.likes.length == 1 ? "Like" : "Likes" }
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div className="secondary-info">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="video-owner">
                        <Image className="video-owner-avatar"
                          src={
                            videoInfo?.userId._id
                              ? "http://localhost:8080/user/avatar/" + videoInfo?.userId._id
                              : "http://localhost:8080/user/defaultAvatar"
                          }
                          alt="avatar"
                        />
                        <div>
                          <Link to={"/profile/" + videoInfo?.userId._id} className="video-owner-username">
                            { videoInfo?.userId.username }
                          </Link>
                          <p className="video-owner-subscribers">
                            { videoInfo?.userId.subscribers.users.length } {videoInfo?.userId.subscribers.users.length == 1 ? "Subscriber" : "Subscribers" }
                          </p>
                        </div>
                      </div>
                      {
                        auth.isAuth && videoInfo?.userId._id != auth.userIdLogin && (
                          <div>
                            {
                              isSubscribed ? (
                                <Button onClick={unsubscribeClick} className="unsubscribe-btn">
                                  Unsubscribe
                                </Button>
                              ) : (
                                <Button onClick={subscribeClick} className="subscribe-btn">
                                  Subscribe
                                </Button>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                    <p className="video-timestamp">Published on {new Date(videoInfo?.createdAt).toDateString()}</p>
                    <div className="video-description">
                      <p>
                        {
                          videoInfo?.description
                        }
                      </p>
                    </div>
                  </div>
                  {
                    auth.isAuth ? (
                      <div className="comment-box">
                        <Image className="comment-avatar"
                          src={
                            user.user?._id
                              ? "http://localhost:8080/user/avatar/" + user.user._id
                              : "http://localhost:8080/user/defaultAvatar"
                          }
                          alt="avatar"
                        />
                        <Form className="comment-form">
                          <Form.Group className="mb-3" controlId="formBasicComment">
                            <Form.Label className="visually-hidden">Write a comment</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Write a comment"
                              onChange={(e) => handleChange(e, "comment")}
                              value={values.comment}
                            />
                          </Form.Group>
                          <Button className="comment-btn" type="submit" onClick={clickSubmit}>
                            Comment
                          </Button>
                        </Form>
                      </div>
                    ) : (
                      <p className="login-alert"><Link to="/auth/login" state={{ from: location.pathname }}>Login</Link> to post a comment</p>
                    )
                  }
                  <h2 className="video-comments-count">
                    { videoComments?.length } {videoComments?.length == 1 ? "Comment" : "Comments" }
                  </h2>
                  <div>
                    {
                      videoComments?.map((comment, i) => {
                        return (
                          <div className="comment-container" key={i}>
                            <Image className="comment-avatar"
                              src={
                                comment.userId._id
                                  ? "http://localhost:8080/user/avatar/" + comment.userId._id
                                  : "http://localhost:8080/user/defaultAvatar"
                              }
                              alt="avatar"
                              />
                            <div>
                              <div className="comment-header">
                                <h3>{comment.userId.username}</h3>
                                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                                {
                                  auth.isAuth && auth.userIdLogin == comment.userId._id && (
                                    <Button variant="danger" onClick={(e) => deleteCommentClick(e, comment)}>
                                      Trash
                                    </Button>
                                  )
                                }
                              </div>
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </Col>
                <Col>
                    <div className="video-section"> 
                      <h2 className="video-section-title">OTHER VIDEOS FROM {videoInfo?.userId.username}</h2>
                      <div className="video-section-list">
                        {
                          otherVideos.map((video, i) => {
                            return (
                              <div className="video-item" key={i}>
                                <div className="video-row">
                                  <div className="video-thumbnail-container">
                                    <Image
                                      className="video-thumbnail"
                                      src={
                                        video._id
                                          ? "http://localhost:8080/content/thumbnail/" + video._id
                                          : "http://localhost:8080/content/defaultThumbnail"
                                      }
                                      alt="thumbnail"
                                    />
                                  </div>
                                  <div className="video-details">
                                    <Link to={"/watch/" + video._id} className="video-title">{video.title}</Link>
                                    <div className="video-owner">
                                      <Image
                                        className="video-user-avatar"
                                        src={
                                          video.userId._id
                                            ? "http://localhost:8080/user/avatar/" + video.userId._id
                                            : "http://localhost:8080/user/defaultAvatar"
                                        }
                                        alt="avatar"
                                      />
                                      <div>
                                        <p className="video-username">{video.userId.username}</p>
                                        <p className="video-category">{ video.category }</p>
                                      </div>
                                    </div>
                                    <div className="video-stats">
                                      <p className="video-views">{video.views} views</p>
                                      <p className="video-timestamp">{new Date(video.createdAt).toDateString()}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                </Col>
              </Row>
            </Container>
        </div>
    </Container> 
  );
};

export default WatchVideo;
