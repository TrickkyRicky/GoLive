import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//Bootstrap
import { Row, Col} from 'react-bootstrap';

//Components
import FollowingCard from '../FollowingCard';

import { getUser, unsubscribe } from "../../store/user/user-actions";

const Subscriptions = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   if(auth.jwtToken) {
  //     dispatch(getUser(auth.jwtToken))
  //   } 
  // }, [auth.jwtToken]);

  const unsubscribeClick = (e, unfollowId) => {
    e.preventDefault();
    
    dispatch(unsubscribe(auth.jwtToken, unfollowId));
  }

  return (
    <Row className='pt-4'>
      <Col sm={0} md={1}></Col>
      <Col sm={12} md={10}>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} xxl={4} xtl={4} className="center-items">
        {
          user.user.subscribed.users.map((user) => (
            <Col className='mx-3 mb-5 follower-column' key={user._id}>
              <FollowingCard user={user} onRemove={(e) => unsubscribeClick(e, user._id)} />
            </Col> 
          ))
        }
        </Row>
      </Col>
      <Col sm={0} md={1}></Col>
    </Row>
  )
}


export default Subscriptions;