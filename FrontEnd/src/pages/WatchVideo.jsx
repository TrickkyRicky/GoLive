import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { getSingleVideo } from "../store/content/content-actions";
import Video from "../components/Video";

const WatchVideo = () => {
  const dispatch = useDispatch();
  let { videoId } = useParams();

  const videoInfo = useSelector((state) => state.content.videoInfo);
//   console.log(videoInfo);

  useEffect(() => {
    dispatch(getSingleVideo(videoId));
  }, [videoId]);

  return (
    <Container>
        <Row>
            <Col>
                <Video videoId={videoId}/>
                <div>
                  <p style={{color: "#FFF"}}>
                    {
                      videoInfo?.title
                    }
                  </p>
                </div>
            </Col>
        </Row>
    </Container>
  );
};

export default WatchVideo;
