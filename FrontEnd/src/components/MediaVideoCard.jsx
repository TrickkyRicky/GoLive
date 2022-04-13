import React from 'react';

//Bootstrap
import { Row, Col, Image, Button } from 'react-bootstrap';

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const MediaVideoCard = ({ video, onDelete }) => {

  return (
    <Row className='media-video-card'>     
      <Image className='img-thumbnail me-3' 
        src={
          video._id
            ? "http://localhost:8080/content/thumbnail/" + video._id + "?" + new Date().getTime()
            : "http://localhost:8080/content/defaultThumbnail"
        }
        alt="avatar"
      />        
      <div className='video-text'>
          <div><h2 className='video-title px-0'>{video.title}</h2></div>
          <div><h4 className='video-description px-0'>{video.description}</h4></div>
          <div><div className='video-type px-3'>{(video.isStreamed) ? "Streamed" : "Video"}</div></div>
      </div>
      <div className='icons'>
          <Button variant="danger" onClick={(e) => onDelete(e, video)}>
            <FontAwesomeIcon className="delete-icon mx-2 pt-0" icon={faXmark}/>
          </Button>
          <FontAwesomeIcon className="edit-icon pt-0" icon={faPenToSquare}/>
      </div>    
    </Row>
  )
}

export default MediaVideoCard;
