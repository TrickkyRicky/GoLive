const io = require("../socket");
const Comment = require("../models/comment.js");

exports.getVideoComments = async (req, res) => {
  try {
    let commments = await Comment.find({
      videoId: req.params.videoId,
    }).populate("userId", "username avatar");

    return res.json(commments);
  } catch (err) {
    return res.status(404).send({
      error: "Could not get comments",
    });
  }
};

exports.postLiveComment = async (req, res, next) => {
  const comment = req.body.liveComment;
  console.log(comment);
  try {
  } catch (err) {}
};
