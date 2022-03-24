// Each comment references a user and each video should reference all comments
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    //   will have to double check if this can store emoji's
    comment: {
      type: String,
      required: true,
    },
    // ref so we know which video the comment belongs to
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    }, 
    // Not required but once a clip is made we should grab the comments associated with it

    // Another solution is checking the videoId of the clip and then getting all the comments between the start and end time of the clip
    clipId: {
      type: Schema.Types.ObjectId,
      ref: "Clip",
    },
    // get info for username of the person writing the comment
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  //   organize comments by time stamp from oldest to newest
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
