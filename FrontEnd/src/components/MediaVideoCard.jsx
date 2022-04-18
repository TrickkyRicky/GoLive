import React, { useState } from 'react';

//Bootstrap
import { Row, Col, Image, Button } from 'react-bootstrap';

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

//Modal
import DeleteModal from './DeleteModal';

const MediaVideoCard = ({ video, onDelete }) => {

  const [modalShow, setModalShow] = useState(false);

  const deleteVideo = (e, video) => {
    onDelete(e, video);
    setModalShow(false);
  }

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
          <Button variant="danger" onClick={() => setModalShow(true)}>
            <FontAwesomeIcon className="delete-icon mx-2 pt-0" icon={faXmark}/>
          </Button>
          <Link to={"/edit/" + video._id}>
            <FontAwesomeIcon className="edit-icon pt-0" icon={faPenToSquare}/>
          </Link>
      </div>   

      <DeleteModal
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone!"
        show={modalShow}
        onDelete={(e) => deleteVideo(e, video)}
        onHide={() => setModalShow(false)}
      /> 
    </Row>
  )
}

export default MediaVideoCard;
