// search users for frontend & save via authentication and subscribed and liked videos, stream key
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    //   key used to access live stream maybe using uuid or crypto
    streamKey: {
      type: String,
      required: true,
    },
    //   check if the user is live via sockets
    live: {
      type: Boolean,
      required: true,
    },
    avatar: {
      data: Buffer,
      contentType: String,
    },
    //   Everything below here needs a custom method
    media: {
      videos: [
        {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
      clips: [
        {
          type: Schema.Types.ObjectId,
          ref: "Clip",
        },
      ],
    },
    //   holds the users they are subscribed to
    subscribed: {
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    //   holds the users subscribed to them
    subscribers: {
      users: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

// userSchema.methods.addToVideos = function (id) {

// };

userSchema.methods.addToClips = function (id) {};

// add and remove people you subscribed to
userSchema.methods.subscribeToUser = function (id) {};
userSchema.methods.unsubscribeUser = function (id) {};

// other users that subscribe to this user
userSchema.methods.addSubscriber = function (id) {};
// other users that unsubscribe to this user
userSchema.methods.removeSubscriber = function (id) {};

module.exports = mongoose.model("User", userSchema);
