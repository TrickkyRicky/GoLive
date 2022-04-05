import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postLiveComment } from "../store/user/user-actions.js";
import io from "socket.io-client";

const Socket1 = (props) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const textChangeHandler = (e) => {
    setText(e.target.value);
  };
  const [roomMessages, setRoomMessages] = useState(["Hi"]);
  let [socket, setSocket] = useState(io.connect("http://localhost:8080"));

  useEffect(() => {
    // // this would be the users username from the url
    socket.emit("join-room", "socket1");
  });

  useEffect(() => {
    socket.on("receive-comment", (comment) => {
      console.log("COMMENT", comment);
      setRoomMessages((prevMSG) => [...prevMSG, comment]);
    });
  }, [socket]);

  const sendToSocket = (e) => {
    e.preventDefault();
    socket.emit("send-comment", text, "socket1");
    dispatch(postLiveComment(props.jwt, text));
  };

  return (
    <>
      <input type="text" onChange={textChangeHandler} value={text} />
      <button onClick={sendToSocket}>Send Message</button>
      <div style={{ paddingTop: "50px" }}>
        <p style={{ fontSize: "20px", color: "white" }}>Test</p>
        {roomMessages?.map((message, index) => (
          <p key={index} style={{ fontSize: "20px", color: "white" }}>
            {message}
          </p>
        ))}
      </div>
    </>
  );
};

export default Socket1;
