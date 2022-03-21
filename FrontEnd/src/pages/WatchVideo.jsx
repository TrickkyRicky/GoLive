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

import { getSingleVideo, getVideoComments } from "../store/content/content-actions";
import { postComment } from "../store/user/user-actions";

import Video from "../components/Video";
import { Buffer } from "buffer";

const WatchVideo = () => {
  const [values, setValues] = useState({
    comment: ''
  });

  const dispatch = useDispatch();
  let { videoId } = useParams();

  const videoInfo = useSelector((state) => state.content.videoInfo);
  const videoComments = useSelector((state) => {
    return {
      comments: state.content.comments
    }
  });
  console.log(videoComments);

  const user = useSelector((state) => {
    return {
      username: state.user.username,
      avatar: state.user.avatar,
    };
  });

  const auth = useSelector((state) => {
    return {
      jwt: state.auth.jwtToken,
      isAuth: state.auth.isAuth
    };
  });

  // console.log(user);

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
    dispatch(getVideoComments(videoId));
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
                    </div>
                    <div>
                      <p className="video-views-count">
                        { videoInfo?.views } Views
                      </p>
                    </div>
                  </div>
                  <div className="secondary-info">
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
                        <Link to={"/Profile/" + videoInfo?.userId._id}>
                          <p className="video-owner-username">
                            { videoInfo?.userId.username }
                          </p>
                        </Link>
                        <p className="video-owner-subscribers">
                          { videoInfo?.userId.subscribers.users.length } Subscribers
                        </p>
                      </div>
                    </div>
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
                        className="comments-avatar"
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
                          <Button className="" type="submit" onClick={clickSubmit}>
                            Comment
                          </Button>
                        </Form>
                      </div>
                    ) : (
                      <div style={{ color: '#fff' }}>Login to post a comment</div>
                    )
                  }
                  <div className="video-comments-count">
                    <p>
                      {
                        videoComments?.comments.length
                      } Comments
                    </p>
                  </div>
                  <div>
                    {
                      videoComments?.comments.map((comment) => {
                        return (
                          <div className="comment-container">
                            <Image
                              className="comments-avatar"
                              src={
                                comment.userId.avatar
                                  ? `data:${comment.userId.avatar.contentType};base64,${Buffer.from(
                                    comment.userId.avatar.data.data
                                    ).toString("base64")}`
                                  : "http://localhost:8080/user/defaultAvatar"
                                }
                              />
                            <div>
                            <h2>{comment.userId.username}</h2>
                            <p>{comment.comment}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </Col>
                <Col>
                  {/* Other videos */}
                </Col>
              </Row>
            </Container>
        </div>
    </Container> 
  );
};

export default WatchVideo;
