const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

const commentController = require("../controller/commentController");

// get comments of a video
router.get("/comments/:videoId", commentController.getVideoComments);

router.post("/liveComment", isAuth, commentController.postLiveComment);

module.exports = router;
