import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { getLikedVideos } from "../store/user/user-actions";
import { Link } from "react-router-dom";

import { BsEyeFill } from 'react-icons/bs';

function LikedVideos() {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const content = useSelector((state) => state.content);

    useEffect(() => {
        if(auth.jwtToken) {
            dispatch(getLikedVideos(auth.jwtToken));
        }
    }, [auth.jwtToken]);
    
    return (
        <Container>
            <section className="liked-videos-section">
                <h2 className="site-text">Liked Videos</h2>
                <div className="video-list">
                {
                    content.likedVideos.map((video, i) => {
                        return (
                            <div key={i} className="video-item">
                                <div className="video-overlay">
                                    <Image className="video-thumbnail"
                                        src={
                                            video._id
                                                ? "http://localhost:8080/content/thumbnail/" + video._id
                                                : "http://localhost:8080/content/defaultThumbnail"
                                        }
                                        alt="thumbnail"
                                    />
                                    <div className="video-views">
                                        <BsEyeFill size={22} color={"#f5f4f4"} /> <p>{video.views}</p>
                                    </div>
                                </div> 
                                <div className="video-item-body">
                                    <div className="video-details">
                                    <Image className="video-user-avatar"
                                        src={
                                            video.userId._id
                                              ? "http://localhost:8080/user/avatar/" + video.userId._id
                                              : "http://localhost:8080/user/defaultAvatar"
                                        }
                                        alt="avatar"
                                    />
                                    <div>
                                        <Link to={"/watch/" + video._id}>
                                        <h5 className="video-title">{video.title}</h5>
                                        </Link>
                                        <Link to={"/profile/" + video.userId._id}>
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
            </section>
        </Container>
    )
}

export default LikedVideos;
