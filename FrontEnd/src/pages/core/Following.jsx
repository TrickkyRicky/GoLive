import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Bootstrap
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

import { Link } from "react-router-dom";
import { getUser } from "../../store/user/user-actions";

const Following = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
 
  console.log(user);

  useEffect(() => {
    if(auth.jwtToken) {
      dispatch(getUser(auth.jwtToken));
    }
  }, [auth.jwtToken]);

  return (
    <section className="subscribed-list">
        <h2 className="site-title">FOLLOWING</h2>
        {
            user.user.subscribed.users.map((user, i) => {
                return (
                    <div className="user-item" key={i}>
                        <Image
                            className="user-avatar"
                            src={
                                user._id
                                  ? "http://localhost:8080/user/avatar/" + user._id
                                  : "http://localhost:8080/user/defaultAvatar"
                            }
                            alt="avatar"
                        />
                        <div>
                            <Link to={"/channel/" + user._id} className="user-username">{user.username}</Link>
                        </div>
                    </div>
                )
            })
        }
    </section>
  );
}

export default Following;