// get, post, and put req for user data
const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");

//Avatar
router.route("/avatar/:userId").get(userController.getAvatar, userController.defaultAvatar);
router.route("/defaultAvatar").get(userController.defaultAvatar);

///User
router.get("/info", isAuth, userController.getUserInfo);
router.put("/updateinfo", isAuth, userController.updateUser);

router.post("/uploadvideo", isAuth, userController.uploadvideo);

//List videos of the user
router.get('/videos/:userId', userController.listUserVideos);

router.param("userId", userController.userByID);

module.exports = router;
