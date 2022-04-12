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
    about: String,
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
    totalViews: {
      type: Number,
      default: 0
    },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  { timestamps: true }
);

userSchema.statics.calcTotalViews = async function (user) {
  const stats = await this.aggregate([
    {
      "$match": {
        _id: user._id
      }
    },
    {
      "$lookup": {
        from: "videos",
        localField: "media.videos",
        foreignField: "_id",
        as: "media.videos"
      }
    },
    {
      "$addFields": {
        "total": {
          "$reduce": {
            input: "$media.videos",
            initialValue: 0,
            in: {
              $add: ["$$value", "$$this.views"]
            }
          }
        }
      }
    },
    {
      "$project": {
          _id: null,
          total: "$total"
      }
    }
  ])

  // console.log(stats)

  await this.findByIdAndUpdate(user._id, {
    totalViews: stats[0].total
  })
};

module.exports = mongoose.model("User", userSchema);
