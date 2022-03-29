import React from 'react'

//Bootstrap
import { Card, Button} from 'react-bootstrap';

//Assets
import ProfilePicture from '../assets/CourageJD.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus} from '@fortawesome/free-solid-svg-icons'

const FollowingCard = ({ follower }) =>{
  return (
    <Card key={follower.id} className="follower-card">
         <Card.Img variant="top" src={ProfilePicture} className='follower-image'/>
         <Card.Title className='pt-2'>{ follower.name }</Card.Title>
         <Card.Subtitle className='pt-2'>{`Following for ${follower.durationOfFollow} Months`}</Card.Subtitle>
         <Button className='remove-button mt-5 mb-4'>
             <div className='remove-text'>Remove</div>
             <div className='remove-icon'><FontAwesomeIcon icon={faCircleMinus}/></div>
         </Button>
    </Card>
  )
}

export default FollowingCard;
