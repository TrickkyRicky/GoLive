import React from 'react'

//Bootstrap
import { Card } from 'react-bootstrap';

const ChannelVideoCard = ({video}) =>{
  return (
    <Card className='channel-video-card'>
        <Card.Img className='thumbnail' variant="top" src={video.thumbnail} />
        <Card.Body className='card-body'>
            <Card.Title className='title pb-3'>{video.title}</Card.Title>
            <Card.Text className='date-of-upload mb-0'>{video.dateOfUpload}</Card.Text>
            <Card.Text className='views'>{numFormatter(video.views) + ' views'}</Card.Text>
        </Card.Body>
    </Card>
  )
}


//Function that shortens length of views, based on amount of views -> K or M or regular
const numFormatter = (views) => {
    if(views > 10000 && views <= 999999){
        return (views/1000).toFixed(1) + 'K'; // convert to K for number from 10,000 < number < 999,999
    }else if(views > 1000000){
        return (views/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(views <= 10000){
        return views; // if value < 10,000, nothing to do
    }
}

export default ChannelVideoCard;