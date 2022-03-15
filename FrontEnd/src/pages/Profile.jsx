import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

import { getUserProfile } from "../store/content/content-actions";

const Profile = () => {
  const dispatch = useDispatch();
  let { userId } = useParams();

  const userProfile = useSelector((state) => {
      return {
          loader: state.content.profileLoader,
          profile: state.content.userProfile
      }
  });

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [userId]);

  return (
    <Container>
        <ListGroup>
            {
                userProfile.profile?.media.videos.map((video, i) => {
                    return (
                        <Link to={"/watch/" + video._id} key={i}>
                            <ListGroup.Item>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{video.title}</Card.Title>
                                        <Card.Text>{video.views} Views</Card.Text>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        </Link>
                    )
                })
            }
        </ListGroup>
    </Container>
  );
};

export default Profile;
