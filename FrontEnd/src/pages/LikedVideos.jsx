import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { getLikedVideos } from "../store/user/user-actions";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";

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
            <div>Liked Videos</div>
            <div className="video-list">
            {
                content.likedVideos.map((video, i) => {
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
        </Container>
    )
}

export default LikedVideos;
