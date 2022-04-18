import React from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { subscribe, unsubscribe } from "../../store/user/user-actions";

//Bootstrap
import {Row, Col, Image} from "react-bootstrap";

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar} from '@fortawesome/free-solid-svg-icons'
import userProfilePicture from '../../assets/CourageJD.jpg'

const ChannelHeader = () =>{
    // const dispatch = useDispatch();
    // const content = useSelector((state) => state.content);
    // const auth = useSelector((state) => state.auth);

    // const subscribeClick = (e) => {
    //     e.preventDefault();
    //     dispatch(subscribe(auth.jwtToken, content.userProfile._id));
    // }
    
    // const unsubscribeClick = (e) => {
    //     e.preventDefault();
    //     dispatch(unsubscribe(auth.jwtToken, content.userProfile._id));
    // }

  return (
    <Row className="channel-header">
        <Col></Col>
        <Col xs={12} sm={10} md={7} lg={6} xl={5} xxl={4} xtl={4} className="flex-row">               
            <div className="channel-profile-picture">
                <Image className="channel-avatar" 
                    src={userProfilePicture}
                    alt="avatar"
                />
            </div>
            <div className="channel-info-container">
                <div className="user-info">CourageJD</div>
                <div className="user-info pt-3">325k Subscribers</div>
                <div className="subscribe-pill pt-4">                   
                    <button className="button px-5">
                        Subscribe <FontAwesomeIcon className="star-icon" icon={faStar}/>
                    </button>    
                </div>
            </div>              
        </Col>
        <Col></Col>
    </Row>
  )
}

export default ChannelHeader;
