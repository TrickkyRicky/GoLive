// get, post, and put req for user data
const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");

router.get("/avatar/:userId", userController.getAvatar, userController.defaultAvatar);
router.get("/defaultAvatar", userController.defaultAvatar);

//User 
router.get("/info", isAuth, userController.getUserInfo);
router.get("/likedvideos", isAuth, userController.getLikedVideos);
router.put("/updateinfo", isAuth, userController.updateUser);

//videos
router.post("/uploadvideo", isAuth, userController.uploadvideo);
router.delete("/info/:videoId", isAuth, userController.deleteVideo);

//Likes
router.put("/video/like", isAuth, userController.likeVideo);
router.put("/video/unlike", isAuth, userController.unlikeVideo);

//Comment
router.post("/video/comment", isAuth, userController.postComment);
router.delete("/video/comment/:commentId", isAuth, userController.deleteComment);

// put isAuth middleware back when testing is done
router.post("/golive", userController.uploadStream);

// When a logged in user subscribes or unsubscribes to another user
router.put("/subscribe", isAuth, userController.addSubscribed, userController.addSubscriber);
router.put("/unsubscribe", isAuth, userController.removeSubscribed, userController.removeSubscriber);

// router
//   .route("/:userId")
//   .get(isAuth, userController.getUser)
//   .put(isAuth, userController.updateUser)
//   .delete(isAuth, userController.deleteUser);

module.exports = router;