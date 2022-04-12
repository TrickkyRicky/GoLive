import React from 'react'

//Bootstrap
import { Row, Col, Image } from 'react-bootstrap'

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import ThumbnailPhoto from '../assets/Yassuo-Thumbnail.jpg';

const MediaVideoCard = () =>{
  return (
    <Row className='media-video-card'>     
        <Image className='img-thumbnail me-3' src={ThumbnailPhoto}/>        
        <div className='video-text'>
            <div><h2 className='video-title px-0'>Title Here</h2></div>
            <div><h4 className='video-description px-0'>Description Here</h4></div>
            <div><div className='video-type px-3'> Stream </div></div>
        </div>
        <div className='icons'>
            <FontAwesomeIcon className="delete-icon mx-2 pt-0" icon={faXmark}/>
            <FontAwesomeIcon className="edit-icon pt-0" icon={faPenToSquare}/>
        </div>    
    </Row>
  )
}

export default MediaVideoCard;
