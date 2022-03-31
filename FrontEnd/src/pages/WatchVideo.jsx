import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';

import { getSingleVideo, getOtherVideos, getVideoComments } from "../store/content/content-actions";
import { likeVideo, unlikeVideo, postComment, subscribe, unsubscribe } from "../store/user/user-actions";

import Video from "../components/Video"; 
import { Buffer } from "buffer";


const WatchVideo = () => {
  const [values, setValues] = useState({
    comment: ''
  });

  const dispatch = useDispatch();
  let { videoId } = useParams();

  const videoInfo = useSelector((state) => state.content.videoInfo);
  const otherVideos = useSelector((state) => state.content.otherVideos);
  const isSubscribed = useSelector((state) => state.content.subscribed);
  const liked = useSelector((state) => state.content.liked);

  const videoComments = useSelector((state) => {
    return {
      comments: state.content.comments
    }
  });

  const user = useSelector((state) => {
    return {
      username: state.user.username,
      avatar: state.user.avatar,
    };
  }); 

  const auth = useSelector((state) => {
    return {
      jwt: state.auth.jwtToken,
      isAuth: state.auth.isAuth,
      userId: state.auth.userIdLogin
    };
  });

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

    dispatch(postComment(auth.jwt, values.comment, videoId));

    setValues({
      ...values,
      comment: ''
    });
  }

  const likeClick = (e) => {
    e.preventDefault();

    dispatch(likeVideo(auth.jwt, videoId));

    // setValues({
    //   ...values,
    //   liked: true
    // });
  }

  const unlikeClick = (e) => {
    e.preventDefault();

    dispatch(unlikeVideo(auth.jwt, videoId));

    // setValues({
    //   ...values,
    //   liked: false
    // });
  }

  const subscribeClick = (e) => {
    e.preventDefault();

    dispatch(subscribe(auth.jwt, videoInfo.userId._id));
  }

  const unsubscribeClick = (e) => {
    e.preventDefault();

    dispatch(unsubscribe(auth.jwt, videoInfo.userId._id));
  }

  return (
    <Container>
        <div>
            <div className="video-container">
              <Video videoId={videoId}/>
            </div>
            <Container>
              <Row>
                <Col>
                  <div className="primary-info">
                    <div>
                      <h1 className="video-title">{ videoInfo?.title }</h1>
                      <div className="video-category">{ videoInfo?.category }</div>
                    </div>
                    <div>
                      <p className="video-views-count">
                        { videoInfo?.views } Views
                      </p>
                      <div className="video-likes-count">
                        {
                          auth.isAuth && (
                            <div>
                              {
                                liked ? (
                                  <Button onClick={unlikeClick}>
                                    Unlike
                                  </Button>
                                ) : (
                                  <Button onClick={likeClick}>
                                    Like
                                  </Button>
                                )
                              }
                            </div>
                          )
                        }
                        { videoInfo?.likes.length } Likes
                      </div>
                    </div>
                  </div>
                  <div className="secondary-info">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="video-owner">
                        <Image className="video-owner-avatar"
                          src={
                            videoInfo?.userId.avatar
                              ? `data:${videoInfo.userId.avatar.contentType};base64,${Buffer.from(
                                  videoInfo.userId.avatar.data.data
                                ).toString("base64")}`
                              : "http://localhost:8080/user/defaultAvatar"
                          } 
                        />
                        <div>
                          <Link to={"/Profile/" + videoInfo?.userId._id} className="video-owner-username">
                            { videoInfo?.userId.username }
                          </Link>
                          <p className="video-owner-subscribers">
                            { videoInfo?.userId.subscribers.users.length } Subscribers
                          </p>
                        </div>
                      </div>
                      {
                        auth.isAuth && videoInfo?.userId._id != auth.userId && (
                          <div>
                            {
                              isSubscribed ? (
                                <Button onClick={unsubscribeClick}>
                                  Unsubscribe
                                </Button>
                              ) : (
                                <Button onClick={subscribeClick}>
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
                        <Image
                        className="comment-avatar"
                        src={
                          user.avatar
                            ? `data:${user.avatar.contentType};base64,${Buffer.from(
                                user.avatar.data.data
                              ).toString("base64")}`
                            : "http://localhost:8080/user/defaultAvatar"
                          }
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
                      <p className="login-alert"><Link to="/auth/login">Login</Link> to post a comment</p>
                    )
                  }
                  <h2 className="video-comments-count">
                    { videoComments?.comments.length } {videoComments?.comments.length == 1 ? "Comment" : "Comments" }
                  </h2>
                  <div>
                    {
                      videoComments?.comments.map((comment, i) => {
                        return (
                          <div className="comment-container" key={i}>
                            <Image
                              className="comment-avatar"
                              src={
                                comment.userId.avatar
                                  ? `data:${comment.userId.avatar.contentType};base64,${Buffer.from(
                                    comment.userId.avatar.data.data
                                    ).toString("base64")}`
                                  : "http://localhost:8080/user/defaultAvatar"
                                }
                              />
                            <div>
                              <div className="comment-header">
                                <h3>{comment.userId.username}</h3>
                                <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
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
                                        video.thumbnail
                                          ? `data:${video.thumbnail.contentType};base64,${Buffer.from(
                                            video.thumbnail.data.data
                                            ).toString("base64")}`
                                          : "http://localhost:8080/user/defaultAvatar"
                                        }
                                    />
                                  </div>
                                  <div className="video-details">
                                    <Link to={"/Watch/" + video._id} className="video-title">{video.title}</Link>
                                    <div className="video-owner">
                                      <Image
                                        className="video-user-avatar"
                                        src={
                                          video.userId.avatar
                                            ? `data:${video.userId.avatar.contentType};base64,${Buffer.from(
                                              video.userId.avatar.data.data
                                              ).toString("base64")}`
                                            : "http://localhost:8080/user/defaultAvatar"
                                          }
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
