import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import { Image } from "react-bootstrap";

const Videos = () => {

  const dispatch = useDispatch();
  let { userId } = useParams();
 
  const content = useSelector((state) => state.content);
  const auth = useSelector((state) => state.auth);

  return (
    <div className="video-list">
        {
            content.userProfile?.media.videos.map((video, i) => {
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
  )
}

export default Videos