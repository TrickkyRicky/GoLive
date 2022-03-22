// get, post, and put req for user data
const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");

// router
//   .route("/avatar/:userId")
//   .get(userController.getAvatar, userController.defaultAvatar);

// router.route("/defaultAvatar").get(userController.defaultAvatar);
 
//User
router.get("/info", isAuth, userController.getUserInfo);
router.put("/updateinfo", isAuth, userController.updateUser);

router.post("/uploadvideo", isAuth, userController.uploadvideo);
router.post("/video/comment", isAuth, userController.postComment);

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

// router.param("userId", userController.userByID);

module.exports = router;
