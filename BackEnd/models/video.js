// end of livestreamed video stored here
// nneds ref to user and to comments

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    //   will have to figure out if this needs to be a type or ref for gridFS
    video: {
      //   type: Binary,
      required: true,
    },
    // this is here as a checker to see if a video was livestreamed or just uploaded. We need to know this so we know to send the video back with comments
    isStreamed: {
      type: Boolean,
      required: true,
    },

    // we reference an array of comments that we will have to make a addToComments method that pushes the comments into this array if the video id matches
    chat: {
      comments: [
        {
          commentId: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            required: true,
          },
        },
      ],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// we only need the id because we can use .populate to get the rest of the data based on the id later
videoSchema.methods.addToComments = function (id) {};
module.exports = mongoose.model("Video", videoSchema);
