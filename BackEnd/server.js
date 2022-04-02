const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const media_server = require("./media_server");
const streamWare = require("./middleware/stream");

require("dotenv").config();

const server = express();

const auth = require("./routes/auth");
const user = require("./routes/user");
const content = require("./routes/content");
const comment = require("./routes/comment");

// change the origin to hosted server origin
server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(streamWare);
server.use(express.json());

server.use("/auth", auth);
server.use("/user", user);
server.use("/content", content);
server.use("/comment", comment);

server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const nodeServer = server.listen(port);
    const io = require("./socket").init(nodeServer);
    io.on("connection", (s) => {
      console.log("CONNNECTED IO SOCKET");
      s.on("disconnect", () => {
        console.log("SOCKET DC'D");
      });
      console.log(s.handshake.query.foo);
    });
  })
  .then(() => {
    console.log(port);
    console.log("MONGO CONNECTED");
  })
  .catch((e) => {
    console.log("WE DIDNT CONNECT");
  });
// media_server.run();
