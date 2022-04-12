// // getters for fetching live streams, videos, clips, etc.

const express = require("express");
const router = express.Router();

// const userController = require("../controller/userController");
const contentController = require("../controller/contentController");

// get every single stream
// router.get("/all/streams", contentController.getStreams);
// // we will expect a query parameter for the type of category of the group of streams we need to send
// router.get("/category/stream", contentController.categoryStream);

// // get every video or under a specific category
router.get("/all/videos", contentController.getAllVideos);
router.get("/search/videos", contentController.getSearchSuggestions);

//List user profile/channel
router.get("/profile/:userId", contentController.listUserProfile);
router.get("/profile/:userId/popular", contentController.listUserPopularVideos);
 
//List other videos
router.get("/other/:videoId", contentController.listOtherVideos);

// Get a single videos content
router.get("/watch/:videoId", contentController.getVideoContent);
 
// Get a single videos info from collection
router.get("/info/:videoId", contentController.incrementViews, contentController.getVideoInfo);

router.get("/thumbnail/:videoId", contentController.getVideoThumbnail, contentController.defaultThumbnail);
router.get("/defaultThumbnail", contentController.defaultThumbnail);

router.get("/categories", contentController.getCategories);

router.get("/latestvideos", contentController.getLatestVideos);

module.exports = router;
