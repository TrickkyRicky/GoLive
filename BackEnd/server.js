const cors = require("cors");
const express = require("express");
const media_server = require("./media_server");

const PORT = 8080;
const server = express();
server.use(cors());

const auth = require("./routes/auth");
const user = require("./routes/user");
const content = require("./routes/content");

// server.use("/auth", auth);
// server.use("/user", user);
server.use("/content", content);

server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

server.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
media_server.run();
