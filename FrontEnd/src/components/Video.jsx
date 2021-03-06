import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Buffer } from "buffer";
 
const Video = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };
  
  useEffect(() => {
    // make sure Video.js player is only initialized once
    const videoJsOptions = {
      // lookup the options in the docs for more options
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: "http://localhost:8080/content/watch/" + props.video._id,
          type: "video/mp4"
        },
      ],
    };

    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(
        videoElement,
        videoJsOptions,
        () => {
          console.log("player is ready");
          handlePlayerReady && handlePlayerReady(player);
        }
      ));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <video 
      ref={videoRef} 
      className="video-js vjs-big-play-centered vjs-matrix vjs-16-9"
      poster={
        props.video?.thumbnail
          && `data:${props.video.thumbnail.contentType};base64,${Buffer.from(
              props.video.thumbnail.data.data
            ).toString("base64")}`
      } 
    />
  );
};

export default Video;