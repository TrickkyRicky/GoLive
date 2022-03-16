// // getters for fetching live streams, videos, clips, etc.

const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const contentController = require("../controller/contentController");

// get every single stream
// router.get("/all/streams", contentController.getStreams);
// // we will expect a query parameter for the type of category of the group of streams we need to send
// router.get("/category/stream", contentController.categoryStream);

// // get every video
// router.get("/all/videos", contentController.getStreams);

//List user profile
router.get('/profile/:userId', contentController.listUserProfile);

// Get a single video
router.get("/watch/:videoId", contentController.getVideoContent);
router.get("/info/:videoId", contentController.getVideoInfo);


// // all you michael
// router.get("/skip/:videoId", contentController.skipVideo);
// // we will expect a query parameter for the type of category of the group of videos we need to send
// router.get("/category/video", contentController.categoryVideo);

router.param("userId", userController.userByID);

module.exports = router;
