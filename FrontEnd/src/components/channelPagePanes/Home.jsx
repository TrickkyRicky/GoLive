import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Bootstrap
import {Image} from "react-bootstrap";

const Home = () =>{

  const content = useSelector((state) => state.content);

  return (
    <div>
        <h2>Popular Uploads</h2>
        <div className="video-list">
            {
                content.popularUploads?.map((video, i) => {
                    return (
                        <div key={i} className="video-item">
                            <div className="video-overlay">
                                <Link to={"/watch/" + video._id}>
                                    <Image className="video-thumbnail" 
                                        src={
                                            video._id
                                                ? "http://localhost:8080/content/thumbnail/" + video._id
                                                : "http://localhost:8080/content/defaultThumbnail"
                                        }
                                        alt="thumbnail"
                                    />
                                </Link>
                            </div> 
                            <div className="video-item-body">
                                <Link to={"/watch/" + video._id}>
                                    <h5 className="video-title">{video.title}</h5>
                                </Link>
                                <div className="video-details">
                                    <div className="video-views">
                                        {video.views} views
                                    </div>
                                    <div className="video-timestamp">
                                        {new Date(video.createdAt).toDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home;
