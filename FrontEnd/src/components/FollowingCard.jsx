import React from 'react';

//Bootstrap
import { Card, Button} from 'react-bootstrap';

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus} from '@fortawesome/free-solid-svg-icons'

const FollowingCard = ({ user, onRemove }) => {
  
  return (
    <Card key={user._id} className="follower-card">
         <Card.Img variant="top" 
          src={
            user._id
              ? "http://localhost:8080/user/avatar/" + user._id + "?" + new Date().getTime()
              : "http://localhost:8080/user/defaultAvatar"
          }
          alt="avatar"
        
          className='follower-image'
         />
         <Card.Title className='pt-2'>{ user.username }</Card.Title>
         {/* <Card.Subtitle className='pt-2'>{`Following for ${follower.durationOfFollow} Months`}</Card.Subtitle> */}
         <Button className='remove-button mt-5 mb-4' onClick={onRemove}>
             <div className='remove-text'>Remove</div>
             <div className='remove-icon'><FontAwesomeIcon icon={faCircleMinus}/></div>
         </Button>
    </Card>
  )
}

export default FollowingCard;
