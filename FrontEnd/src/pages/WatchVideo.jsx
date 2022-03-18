import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';

import { getSingleVideo } from "../store/content/content-actions";
import Video from "../components/Video";
import { Buffer } from "buffer";

const WatchVideo = () => {
  const dispatch = useDispatch();
  let { videoId } = useParams();

  const videoInfo = useSelector((state) => state.content.videoInfo);
  // console.log(videoInfo);

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
  }, [videoId]);

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
