// get, post, and put req for user data
const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");

router 
  .route("/avatar/:userId")
  .get(userController.getAvatar, userController.defaultAvatar);

router.route("/defaultAvatar").get(userController.defaultAvatar);

router.get("/info", isAuth, userController.getUserInfo);
router.put("/updateinfo", isAuth, userController.updateUser);

// router
//   .route("/:userId")
//   .get(isAuth, userController.getUser)
//   .put(isAuth, userController.updateUser)
//   .delete(isAuth, userController.deleteUser);

router.param("userId", userController.userByID);

module.exports = router;
