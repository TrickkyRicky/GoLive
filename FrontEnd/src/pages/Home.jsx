import Video from "../components/Video";

const Home = (props) => {
  return (
    <>
      This is the Home page
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Video streamKey={"STREAM_NAME"} />
        <Video streamKey={"STREAM_LLAMA"} />
      </div>
    </>
  );
};

export default Home;
