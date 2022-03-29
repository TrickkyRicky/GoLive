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
    let media = await Video.findById(req.params.videoId).populate('userId', 'username avatar subscribers').populate('chat.comments');

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

exports.incrementViews = async (req, res, next) => {
  try {
      await Video.findByIdAndUpdate(req.params.videoId, { $inc: { "views": 1 } }, { new: true }).exec();

      next()
  } catch (e) {
      return res.status(400).json({
          error: "Could not increase views"
      })
  }
}

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

  const range = req.headers["range"];
  console.log(range);

  //Skip through video
  if(range && typeof range === "string") {
    const parts = range.replace(/bytes=/, "").split("-");
    const partialStart = parts[0];
    const partialEnd = parts[1];

    const start = parseInt(partialStart, 10);
    const end = partialEnd ? parseInt(partialEnd, 10) : files[0].length -1;

    const chunkSize = (end - start) + 1;

    res.writeHead(206, {
      'Accept-Ranges': 'bytes',
      'Content-length': chunkSize,
      'Content-Range': 'bytes ' + start + '-' + end + '/' + files[0].length,
      'Content-Type': files[0].contentType
    })
    
    let downloadStream = gridfs.openDownloadStream(files[0]._id, {
      start, 
      end: end + 1
    })

    downloadStream.pipe(res)
    downloadStream.on('error', () => {
        res.sendStatus(404)
    })
    downloadStream.on('end', () => {
        res.end()
    })
  } else { //Press play start from beginning
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
  }

};

//List user profile
exports.listUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId)
      .populate("media.videos")
      .populate("subscribed.users", "-password")
      .select("-password -streamKey");

    res.json(user);
  } catch (e) {
    return res.status(400).json({
      error: "Could not list media by user"
    }); 
  }
};

//List other videos from a user except currently watching video
exports.listOtherVideos = async (req, res) => {
  try {

    let video = await Video.findById(req.params.videoId).select('userId');
    
    let videos = await Video.find({
        "_id": { "$ne": req.params.videoId },
        "userId": video.userId
    }).limit(7).populate('userId', '_id username avatar').exec();

    res.json(videos);
  } catch (e) {
    return res.status(400).json({
      error: "Could not list other videos from user"
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

//Get all videos or under a specific category
exports.getAllVideos = async (req, res) => {
  try {
    let query = {};

    if(req.query.category) {
      query.category = req.query.category;
    }

    const videos = await Video.find(query).populate("userId", "_id username avatar");

    res.json(videos);
  } catch (e) {
    return res.status(400).json({
      error: "Could not get videos"
    });
  }
}
