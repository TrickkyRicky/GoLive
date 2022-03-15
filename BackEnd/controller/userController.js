//models
const User = require("../models/user.js");
const Video = require("../models/video.js");

const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

// const bcrypt = require("bcryptjs");
 
//Gridfs
const mongoose = require("mongoose");

let gridfs = null;

mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -live -resetToken -resetTokenExpiration -createdAt -updatedAt -_id -__v"
    );
    return res.status(200).json(user);
  } catch (e) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status("400").json({
        error: "User not found",
      });
    }

    //Attach to request
    req.user = user;

    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

exports.getUser = (req, res) => {
  return res.json(req.user);
};

exports.updateUser = async (req, res) => {
  let form = new formidable.IncomingForm();

  //include extentions of files
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded",
      });
    }

    //Get user by its id
    const user = await User.findById(req.userId);

    //Extend user
    Object.assign(user, fields);
    // console.log(user)

    //If there is a avatar in the incoming req
    if (files.avatar) {
      user.avatar.data = fs.readFileSync(files.avatar.filepath);
      user.avatar.contentType = files.avatar.mimetype;
    }

    try {
      await user.save();
      res.json(user);
    } catch (e) {
      res.status("400").json({
        error: "Could not update user",
      });
    }
  });
};

exports.deleteUser = async (req, res) => {
  try {
    let user = req.user;

    let deletedUser = await user.remove();

    res.json(deletedUser);
  } catch (e) {
    return res.status(400).json({
      error: "Could not delete.",
    });
  }
};

exports.getAvatar = (req, res, next) => {
  //send back data
  if (req.user.avatar) {
    res.set("Content-Type", req.user.avatar.contentType);
    return res.send(req.user.avatar.data);
  }

  next();
};

exports.defaultAvatar = (req, res) => {
  return res.sendFile(path.resolve("BackEnd/assets/default-avatar.png"));
};

exports.uploadvideo = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status("400").json({
        error: "Video could not be uploaded",
      });
    }

    console.log(fields);

    //Create new video
    let newVideo = new Video(fields);
    newVideo.userId = req.userId;

    //If video then store in gridfs
    if (files.video) {
      let writeStream = gridfs.openUploadStream(newVideo._id, {
        contentType: files.video.mimetype || "binary/octet-stream",
      });

      fs.createReadStream(files.video.filepath).pipe(writeStream);
    }

    try {
      //Save video to video collection
      let result = await newVideo.save();
      await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { "media.videos": newVideo._id } },
        { new: true }
      );

      res.status("200").json(result);
    } catch (e) {
      return res.status("400").json({
        error: "Could not save video",
      });
    }
  });
};

//List user videos
exports.listUserVideos = async (req, res) => {
  try {
    let videos = await User.findById(req.user._id).populate("media.videos").select("media");

    res.json(videos)
  } catch (e) {
      return res.status(400).json({
          error: "Could not list media by user"
      })
  }
};