import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { listCategories, listVideos } from "../store/content/content-actions";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";

import { BsEyeFill } from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import Following from "./core/Following";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DynamicFaIcon = ({ icon }) => {
  const Icon = FaIcons[icon];

  if(!Icon) {
    return <FaIcons.FaCheck />
  }

  return <Icon />
}

const Home = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("Art");

  const homeState = useSelector((state) => state.content);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    //List Categories
    dispatch(listCategories());

    //Default
    dispatch(
      listVideos({
        category: "Art",
      })
    );
  }, []);

  const clickCategory = (e, title) => {
    setActive(title);

    dispatch(
      listVideos({
        category: title,
      })
    );
  };

  return (
    <Container fluid>
      <div>
      <Carousel infinite={true} responsive={responsive}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Carousel>
      </div>
      <div className="home-bt-section">
        {
          homeState.listShow && (
            <div className="column">
              <Following />
            </div>
          )
        }
        <div className="column">
          <section className="explore">
          <div>
            <h2 className="site-text">EXPLORE</h2>
          </div>
          <Nav className="category-list">
            {homeState.categories.map((category, i) => {
              return (
                <Button
                  key={i}
                  className={
                    active === category.title ? "category-pill active" : "category-pill"
                  }
                  onClick={(e) => clickCategory(e, category.title)}
                >
                  <DynamicFaIcon icon={category.icon} />
                  {category.title}
                </Button>
              );
            })}
          </Nav>
          <div className="video-list">
            {homeState.videos.map((video, i) => {
              return (
                <div key={i} className="video-item">
                  <div className="video-overlay">
                    <Image
                      className="video-thumbnail"
                      src={
                        video.thumbnail
                          ? `data:${
                              video.thumbnail.contentType
                            };base64,${Buffer.from(
                              video.thumbnail.data.data
                            ).toString("base64")}`
                          : "http://localhost:8080/user/defaultAvatar"
                      }
                      alt="thumbnail"
                    />
                    <div className="video-views">
                      <BsEyeFill size={22} color={"#f5f4f4"} />{" "}
                      <p>{video.views}</p>
                    </div>
                  </div>
                  <div className="video-item-body">
                    <div className="video-details">
                      <Image
                        className="video-user-avatar"
                        src={
                          video.userId.avatar
                            ? `data:${
                                video.userId.avatar.contentType
                              };base64,${Buffer.from(
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
              );
            })}
          </div>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default Home;
