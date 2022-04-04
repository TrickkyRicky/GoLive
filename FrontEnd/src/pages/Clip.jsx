import React, { useRef, useEffect } from "react";
import { Brush } from "@visx/brush";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import StreamVideo from "../components/StreamVideo";
import io from "socket.io-client";

const url = "http://localhost:8080/content/watch/6238feffd59f8385b8fdcc9c";
// const url = "http://localhost:8080/content/watch/623a47ffcf8e15d3d466a5ef";
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 };
const selectedBrushStyle = {
  // fill: `red`,
  fill: `rgba(0, 0, 0, .2)`,
  stroke: "white",
};

const initialBrushPosition = () => ({
  start: { x: 0 },
  end: { x: 10 },
});

const Clip = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const brushRef = useRef(null);

  console.log(playerRef);

  useEffect(() => {
    io.connect("http://localhost:8080", {
      withCredentials: true,
    });
  }, []);

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    console.log(playerRef.current.cache_);

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
          src: url,
          type: "video/mp4",
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
    <>
      <StreamVideo streamKey={"STREAM_NAME"} />
      <div
        style={{
          marginTop: "1000px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          height: "140vh",
        }}
      >
        <video
          ref={videoRef}
          // style={{ height: 400 }}
          className="video-js vjs-big-play-centered"
        />
        <svg
          width={"100%"}
          height={"100%"}
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Brush
            // xScale={brushDateScale}
            // yScale={brushStockScale}
            xScale={20}
            yScale={10}
            // width={xBrushMax}
            // height={yBrushMax}
            width={1500}
            height={100}
            margin={brushMargin}
            handleSize={8}
            innerRef={brushRef}
            resizeTriggerAreas={["left", "right"]}
            brushDirection="horizontal"
            // initialBrushPosition={() => ({
            //   start: { x: 1 },
            //   end: { x: 10 },
            // })}
            // initialBrushPosition={initialBrushPosition}
            // onChange={onBrushChange}
            // onClick={() => setFilteredStock(stock)}
            selectedBoxStyle={selectedBrushStyle}
            useWindowMoveEvents
          />
        </svg>
      </div>
    </>
  );
};

export default Clip;
