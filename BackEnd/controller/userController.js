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
    const user = await User.findById(req.userId).populate('subscribed.users', '_id username').select(
      "_id username subscribed"
    );
    return res.status(200).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
 
exports.getLikedVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      likes: req.userId,
    }).populate("userId", "_id username").select("-thumbnail");

    res.status(200).json(videos);
  } catch (err) {
    res.status("400").json({
      error: "Could not get liked videos",
    });
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

// exports.deleteUser = async (req, res) => {
//   try {
//     let user = req.user;

//     let deletedUser = await user.remove();

//     res.json(deletedUser);
//   } catch (e) {
//     return res.status(400).json({
//       error: "Could not delete.",
//     });
//   }
// };

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

exports.deleteVideo = async (req, res) => {
  try {
    //Delete from mongodb
    let video = await Video.findById(req.params.videoId);
    let deletedVideo = await video.remove();

    await User.findByIdAndUpdate(
      { _id: req.userId._id },
      { $pull: { "media.videos": video._id } },
      { new: true }
    ).exec();

    //Delete from gridfs
    let files = await gridfs.find({
      filename: video._id
    }).toArray();

    gridfs.delete(files[0]._id);

    res.json(deletedVideo);
  } catch (e) {
    return res.status("400").json({
      error: "Could not delete video"
    })
  }
}

// THIS IS FNISHED YET
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

exports.likeVideo = async (req, res) => {
  try {
    let result = await Video.findByIdAndUpdate(
      req.body.videoId,
      {
        $push: {
          likes: req.userId,
        },
      },
      { new: true }
    );

    res.status("200").json(result);
  } catch (e) {
    return res.status("400").json({
      error: "Could not like video",
    });
  }
};

exports.unlikeVideo = async (req, res) => {
  try {
    let result = await Video.findByIdAndUpdate(
      req.body.videoId,
      {
        $pull: {
          likes: req.userId,
        },
      },
      { new: true }
    );

    res.status("200").json(result);
  } catch (e) {
    return res.status("400").json({
      error: "Could not unlike video",
    });
  }
};

exports.postComment = async (req, res) => {
  //Create new comment
  let newComment = new Comment(req.body);
  newComment.userId = req.userId;
  newComment.timestamps = Date.now();

  try {
    let data = await newComment.save();

    let result = await data.populate("userId", "username avatar");

    res.status("200").json(result);
  } catch (e) {
    return res.status("400").json({
      error: "Could not save comment",
    });
  }
};

exports.deleteComment = async (req, res) => {
  //Delete comment
  try {
    let comment = await Comment.findById(req.params.commentId);
    let deletedComment = await comment.remove();

    res.status("200").json(deletedComment);
  } catch (e) {
    return res.status("400").json({
      error: "Could not delete comment",
    });
  }
};

exports.addSubscribed = async (req, res, next) => {
  try {
    //followId is the user you're trying to subscribe to
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { "subscribed.users": req.body.followId } }
    );

    next();
  } catch (e) {
    return res.status("400").json({
      error: "Could not subscribe to user",
    });
  }
};

exports.addSubscriber = async (req, res) => {
  try {
    //followId is the user that has a new subscriber
    let result = await User.findByIdAndUpdate(
      { _id: req.body.followId },
      { $push: { "subscribers.users": req.userId } },
      { new: true }
    )
      .populate("subscribed.users", "_id name")
      .populate("subscribers.users", "_id name")
      .select("_id username avatar")
      .exec();

    res.json(result);
  } catch (e) {
    return res.status("400").json({
      error: "Could not subscribe to user",
    });
  }
};

exports.removeSubscribed = async (req, res, next) => {
  try {
    //followId is the user you're trying to unsubscribe from
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $pull: { "subscribed.users": req.body.unfollowId } }
    );

    next();
  } catch (e) {
    return res.status("400").json({
      error: "Could not unsubscribe from user",
    });
  }
};

exports.removeSubscriber = async (req, res) => {
  try {
    //followId is the user that has a unsubscriber
    let result = await User.findByIdAndUpdate(
      { _id: req.body.unfollowId },
      { $pull: { "subscribers.users": req.userId } },
      { new: true }
    )
      .populate("subscribed.users", "_id name")
      .populate("subscribers.users", "_id name")
      .select("_id username avatar")
      .exec();

    res.json(result);
  } catch (e) {
    return res.status("400").json({
      error: "Could not remove subscriber from user",
    });
  }
};

exports.getAvatar = async (req, res, next) => {
  let user = await User.findById(req.params.userId);

  //send back data
  if (user.avatar) {
    res.set("Content-Type", user.avatar.contentType);

    return res.send(user.avatar.data);
  }

  next();
};

exports.defaultAvatar = (req, res) => {
  return res.sendFile(path.resolve("FrontEnd/src/assets/default-avatar.png"));
};