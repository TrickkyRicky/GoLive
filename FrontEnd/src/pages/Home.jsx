import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { listCategories, listVideos } from "../store/content/content-actions";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";

const Home = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("Gaming");

  const homeState = useSelector((state) => {
    return {
      categoryNames: state.content.categoryNames,
      videos: state.content.videos
    }
  });

  useEffect(() => {
    //List Categories
    dispatch(listCategories());

    //Default
    dispatch(listVideos({
      category: "Gaming"
    }));
  }, []);

  const clickCategory = (e, title) => {
    console.log(e.target, title);
    setActive(title);

    dispatch(listVideos({
      category: title
    }));
  }

  return (
    <Container>
      <div>
        Carousel
      </div>
      <div>
        <div>
          <h2 className="site-text">EXPLORE</h2>
        </div>
        <Nav className="category-list">
          {
            homeState.categoryNames.map((title, i) => {
              return (
                <Button key={i} className={(active === title ? "category-pill active" : "category-pill")} onClick={e => clickCategory(e, title)}>{title}</Button>
              )
            })
          }
        </Nav>
        <div className="d-flex">
        {
            homeState.videos.map((video, i) => {
              return (
                <div key={i} className="video-item">
                  <div className="video-overlay">
                    <Image className="video-thumbnail" 
                    src={
                      video.thumbnail
                        ? `data:${video.thumbnail.contentType};base64,${Buffer.from(
                            video.thumbnail.data.data
                          ).toString("base64")}`
                        : "http://localhost:8080/user/defaultAvatar"
                    }
                    alt="thumbnail" />
                    <Card.Text className="video-views">
                      {video.views} Views
                    </Card.Text>
                  </div>
                  <div className="video-item-body">
                    <div className="video-details">
                      <Image className="video-user-avatar"
                        src={
                          video.userId.avatar
                            ? `data:${video.userId.avatar.contentType};base64,${Buffer.from(
                                video.userId.avatar.data.data
                              ).toString("base64")}`
                            : "http://localhost:8080/user/defaultAvatar"
                        } 
                      />
                      <div>
                        <Link to={"/Watch/" + video._id}>
                          <Card.Title className="video-title">{video.title}</Card.Title>
                        </Link>
                        <Link to={"/Profile/" + video.userId._id}>
                          <Card.Text className="video-username">
                            {video.userId.username}
                          </Card.Text>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </Container>
  );
};

export default Home;
