import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { listCategories, listVideos, listLatestVideos } from "../store/content/content-actions";
import { Link } from "react-router-dom";

import { BsEyeFill } from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import Following from "./core/Following";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DynamicFaIcon = ({ icon }) => {
  const Icon = FaIcons[icon];

  if(!Icon) {
    return <FaIcons.FaCheck />
  }

  return <Icon className="category-icon" />
}

const Home = () => {
  const dispatch = useDispatch();

  const [active, setActive] = useState("Art");
  const content = useSelector((state) => state.content);

  let settings = {
    className: "slider variable-width",
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true
  }

  useEffect(() => {
    //Latest Videos
    dispatch(listLatestVideos());

    //List Categories
    dispatch(listCategories());

    //List Videos by Category
    dispatch(listVideos({ category: "Art" }));
  }, []);

  const clickCategory = (e, title) => {
    e.preventDefault();
    
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
        <Slider {...settings}>
          {
            content.latestVideos.map((video, i) => {
              return (
                  <Image
                    key={i}
                    className="video-thumbnail"
                    src={
                      video._id
                        ? "http://localhost:8080/content/thumbnail/" + video._id
                        : "http://localhost:8080/content/defaultThumbnail"
                    }
                    alt="thumbnail"
                  />
              )
            })
          }
        </Slider>
      </div>
      <div className="home-bt-section">
        {
          content.listShow && (
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
            {content.categories.map((category, i) => {
              return (
                <Button
                  key={i}
                  variant="pill"
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
            {content.videos.map((video, i) => {
              return (
                <div key={i} className="video-item">
                  <div className="video-overlay">
                    <Image
                      className="video-thumbnail"
                      src={
                        video._id
                          ? "http://localhost:8080/content/thumbnail/" + video._id
                          : "http://localhost:8080/content/defaultThumbnail"
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
                          video.userId._id
                            ? "http://localhost:8080/user/avatar/" + video.userId._id
                            : "http://localhost:8080/user/defaultAvatar"
                        }
                      />
                      <div>
                        <Link to={"/watch/" + video._id}>
                          <h5 className="video-title">{video.title}</h5>
                        </Link>
                        <Link to={"/channel/" + video.userId._id}>
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
