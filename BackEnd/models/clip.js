// this will hold the edited clips no greater than 1 min
// needs ref to user and possible ref to video

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clipSchema = new Schema(
  {
    //   will have to figure out if this needs to be a type or ref for gridFS
    clip: {
      //   type: Binary,
      required: true,
    },

    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clip", clipSchema);
