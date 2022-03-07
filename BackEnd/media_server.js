const NodeMediaServer = require("node-media-server");
require("dotenv").config();

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./BackEnd/media",
    allow_origin: "*",
  },
  trans: {
    ffmpeg: process.env.FFPATH,
    tasks: [
      {
        app: "live",
        hls: true,
        hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
        dash: true,
        dashFlags: "[f=dash:window_size=3:extra_window_size=5]",
      },
    ],
  },
};

var nms = new NodeMediaServer(config);

module.exports = nms;
