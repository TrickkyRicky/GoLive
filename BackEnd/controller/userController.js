//models
const User = require("../models/user.js");
const Video = require("../models/video.js");
const Comment = require("../models/comment.js");

const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

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
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
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

    //If there is a thumbnail
    if (files.thumbnail) {
      newVideo.thumbnail.data = fs.readFileSync(files.thumbnail.filepath);
      newVideo.thumbnail.contentType = files.thumbnail.mimetype;
    }

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

      //Add video to users media
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

exports.uploadStream = async (req, res, next) => {
  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  console.log(title);

  const liveFolder = path.join(__dirname, "../media/live");
  const watcher = chokidar.watch(liveFolder, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });
  const log = console.log.bind(console);
  let streamKey = null;
  let counter = 0;
  const video = new Video();
  watcher.on("unlink", (filePath) => {
    // once we test user accounts should be 0-69
    streamKey = filePath.split("live/")[1].substring(0, 11);
    log(streamKey);
    const liveFolderKey = path.join(__dirname, `../media/live/${streamKey}`);
    fs.readdir(liveFolderKey, (err, files) => {
      if (files.length === 1) {
        files.forEach(async (file) => {
          if (path.extname(file) === ".mp4") {
            const mp4Path = path.join(
              __dirname,
              `../media/live/${streamKey}/${file}`
            );
            counter++;
            video.title = title;
            video.category = category;
            video.description = description;
            video.isStreamed = true;
            video.userId = "62269377f49aa22e335213ed";
            let writeStream = gridfs.openUploadStream(video._id, {
              contentType: "video/mp4" || "binary/octet-stream",
            });

            try {
              if (counter === 1) {
                fs.createReadStream(mp4Path).pipe(writeStream);
                const result = await video.save();
                await User.findOneAndUpdate(
                  { _id: "62269377f49aa22e335213ed" },
                  { $push: { "media.videos": video._id } },
                  { new: true }
                );
                fs.unlink(mp4Path, (err) => {
                  if (err) {
                    throw err;
                  }
                });
                res.status("200").json({ videoId: result._id });
              }
            } catch (err) {
              if (!err.statusCode) {
                err.statusCode = 500;
              }
            }
          }
        });
      }
    });
  });
};

exports.postComment = async (req, res) => {

    //Create new comment
    let newComment = new Comment(req.body);
    newComment.userId = req.userId;
    newComment.timestamps = Date.now();

    try {
      //Save video to video collection
      let data = await newComment.save();

      let result = await data.populate('userId', 'username avatar');

      //Add comment to video
      // await Video.findOneAndUpdate(
      //   { _id: req.body.videoId },
      //   { $push: { "chat.comments": newComment._id } },
      //   { new: true }
      // );

      res.status("200").json(result);
    } catch (e) {
      return res.status("400").json({
        error: "Could not save comment",
      });
    }
};