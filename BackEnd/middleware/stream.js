const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");
const mongoose = require("mongoose");
const User = require("../models/user.js");
const Video = require("../models/video.js");

let gridfs = null;
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

module.exports = (req, res, next) => {
  const liveFolder = path.join(__dirname, "../media/live");
  const watcher = chokidar.watch(liveFolder, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
  });
  const log = console.log.bind(console);
  let streamKey = null;
  watcher
    // .on("add", (path) => log(`File ${path} has been added`))
    // .on("change", (path) => log(`File ${path} has been changed`))
    .on("unlink", (filePath) => {
      // once we test user accounts should be 0-69
      streamKey = filePath.split("live/")[1].substring(0, 11);
      log(streamKey);
      log(`File ${filePath} has been removed`);
      const liveFolderKey = path.join(__dirname, `../media/live/${streamKey}`);
      fs.readdir(liveFolderKey, (err, files) => {
        if (files.length === 1) {
          files.forEach((file) => {
            if (path.extname(file) === ".mp4") {
              // let writeStream = gridfs.openUploadStream(newVideo._id, {
              //   contentType: ".mp4" || "binary/octet-stream",
              // });
              // fs.createReadStream(file.video.filepath).pipe(writeStream);
            }
          });
        }
      });
    });
  next();
};
