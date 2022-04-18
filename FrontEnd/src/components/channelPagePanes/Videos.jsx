import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Bootstrap
import { Container, Image, Row, Col } from "react-bootstrap";

//Assets
import thumbnailPhoto from '../../assets/Yassuo-Thumbnail.jpg'
import ChannelVideoCard from './ChannelVideoCard';

const Videos = () => {

//   const dispatch = useDispatch();
//   let { userId } = useParams();
 
//   const content = useSelector((state) => state.content);
//   const auth = useSelector((state) => state.auth);

    const videoCards = [
        {
            id: 1,
            thumbnail: thumbnailPhoto,
            title: 'Trying out a new game for fun',
            dateOfUpload: '3 years ago',
            views: 4103
        },
        {
            id: 2,
            thumbnail: thumbnailPhoto,
            title: 'This is a different title #2',
            dateOfUpload: '1 year ago',
            views: 119
        },
        {
            id: 3,
            thumbnail: thumbnailPhoto,
            title: 'Welcome to the League!',
            dateOfUpload: '2 months ago',
            views: 20101
        },
        {
            id: 4,
            thumbnail: thumbnailPhoto,
            title: 'I dont know what else to write',
            dateOfUpload: '1 hour ago',
            views: 10103
        },
        {
            id: 5,
            thumbnail: thumbnailPhoto,
            title: 'This is also a random title',
            dateOfUpload: '11 years ago',
            views: 5119334
        },
        {
            id: 6,
            thumbnail: thumbnailPhoto,
            title: 'This is the last random title',
            dateOfUpload: '8 years ago',
            views: 493100
        },
        {
            id: 7,
            thumbnail: thumbnailPhoto,
            title: 'Title #7 here is included',
            dateOfUpload: '1 month ago',
            views: 19000
        },
        {
            id: 8,
            thumbnail: thumbnailPhoto,
            title: 'Yassuo Thumbnail Title',
            dateOfUpload: '2 years ago',
            views: 7991
        },

    ]


  return (
    <Container className='videos-pane-container pt-4'>
        <Row>
            <p className='uploads-text px-5'>Uploads</p>
        </Row>
        <Row xs={1} sm={1} md={2} lg={3} xl={4} xxl={5} xtl={5}>
            {
                videoCards.map((video) => 
                <Col className='px-5 py-3'>
                    <ChannelVideoCard video={video}/>
                </Col>)
            }
        </Row>
    </Container>
  )
}

export default Videos


{/* <div className="video-list">
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
    </div> */}