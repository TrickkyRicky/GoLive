const User = require("../models/user.js");
const Video = require("../models/video.js");

//Gridfs
const mongoose = require("mongoose");

let gridfs = null;

mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

//  return stream keys of live users
exports.getStreams = async (req, res, next) => {
  try {
    res.status(200).json({});
  } catch (err) {
    console.log(err);
  }
};

exports.getVideoInfo = async (req, res) => {
  try {
    let media = await Video.findById(req.params.videoId);

    if (!media) {
      return res.status("400").json({
        error: "Media not found",
      });
    }

    return res.json(media);
  } catch (err) {
    return res.status(404).send({
      error: "Could not retrieve media file",
    });
  }
};

exports.getVideoContent = async (req, res) => {
  let media = await Video.findById(req.params.videoId);
  if (!media)
    return res.status("400").json({
      error: "Media not found",
    });

  //Search through gridfs
  let files = await gridfs
    .find({
      filename: media._id,
    })
    .toArray();

  if (!files[0]) {
    return res.status(404).send({
      error: "No video found",
    });
  }

  res.header("Content-Length", files[0].length);
  res.header("Content-Type", files[0].contentType);

  let downloadStream = gridfs.openDownloadStream(files[0]._id);
  downloadStream.pipe(res);
  downloadStream.on("error", () => {
    res.sendStatus(404);
  });
  downloadStream.on("end", () => {
    res.end();
  });
};

//List user profile
exports.listUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id)
      .populate("media.videos")
      .select("media subscribers username");

    res.json(user);
  } catch (e) {
    return res.status(400).json({
      error: "Could not list media by user"
    });
  }
};

exports.getCategories = (req, res) => {
  try {
    res.json([
      "Gaming", "Education", "Art", "Beauty", "Chatting", "Music", "Sports", "Vlogs"
    ]);
  } catch (e) {
    return res.status(400).json({
      error: "Could not get category names"
    });
  }
};
