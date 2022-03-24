const express = require("express");
const router = express.Router();

const commentController = require("../controller/commentController");

// get comments of a video
router.get("/comments/:videoId", commentController.getVideoComments);

module.exports = router;