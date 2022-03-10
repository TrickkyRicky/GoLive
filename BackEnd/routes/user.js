// get, post, and put req for user data
const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");
const isAuth = require("../middleware/isAuth");

router.route('/avatar/:userId')
    .get(userController.getAvatar, userController.defaultAvatar)

router.route('/defaultAvatar')
    .get(userController.defaultAvatar)

router.route('/:userId')
    .put(isAuth, userController.update)

router.param('userId', userController.userByID);

module.exports = router;