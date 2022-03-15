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

exports.getSingleVideo = async (req, res) => {
  try{
    let media = await Video.findById(req.params.videoId);

    if(!media) {
      return res.status('400').json({
        error: "Media not found"
      })
    }

    //Search through gridfs
    // let files = await gridfs.find({
    //   filename: media._id
    // }).toArray();

    // if (!files[0]) {
    //   return res.status(404).send({
    //     error: 'No video found'
    //   })
    // }     

    // console.log(files[0])

    return res.json(media);

    } catch(err) {
      return res.status(404).send({
        error: 'Could not retrieve media file'
      })
    }
};


//List user profile
exports.listUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate("media.videos").select("media subscribers username");

    res.json(user)
  } catch (e) {
      return res.status(400).json({
          error: "Could not list media by user"
      })
  }
};