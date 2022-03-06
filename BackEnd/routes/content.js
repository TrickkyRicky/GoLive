// getters for fetching live streams, videos, clips, etc.

const express = require("express");
const router = express.Router();

const contentController = require("../controller/contentController");

router.get("/streams", contentController.getStreams);

module.exports = router;
