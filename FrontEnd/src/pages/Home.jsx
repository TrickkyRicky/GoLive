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

import { BsEyeFill } from 'react-icons/bs';

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
        <div className="video-list">
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
                    <div className="video-views">
                      <BsEyeFill size={22} color={"#f5f4f4"} /> <p>{video.views}</p>
                    </div>
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
                          <h5 className="video-title">{video.title}</h5>
                        </Link>
                        <Link to={"/Profile/" + video.userId._id}>
                          <p className="video-username">
                            {video.userId.username}
                          </p>
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
