import React from 'react'

//Bootstrap
import { Row, Col} from 'react-bootstrap';

//Assets
import ProfilePicture from '../../assets/CourageJD.jpg';

//Components
import FollowingCard from '../FollowingCard';

const Subscriptions = () => {

  const followers = [
    {
      id: 1,
      name: 'Ninja',
      profilePicture: ProfilePicture,
      durationOfFollow: 3
    },
    {
      id: 2,
      name: 'Pokimane',
      profilePicture: ProfilePicture,
      durationOfFollow: 5
    },
    {
      id: 3,
      name: 'CourageJD',
      profilePicture: ProfilePicture,
      durationOfFollow: 7
    },
    {
      id: 4,
      name: 'Timthetatman',
      profilePicture: ProfilePicture,
      durationOfFollow: 9
    },
    {
      id: 5,
      name: 'Valkyrie',
      profilePicture: ProfilePicture,
      durationOfFollow: 11
    },
    {
      id: 6,
      name: 'BrookeAB',
      profilePicture: ProfilePicture,
      durationOfFollow: 23
    },
    {
      id: 7,
      name: 'Yassuo',
      profilePicture: ProfilePicture,
      durationOfFollow: 37
    },
    {
      id: 8,
      name: 'Nadeshot',
      profilePicture: ProfilePicture,
      durationOfFollow: 48
    }
  ]


  return (
    <Row className='pt-4'>
      <Col sm={0} md={1}></Col>
      <Col sm={12} md={10}>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} xxl={4} xtl={4} className="center-items">
        {
          followers.map((follower) => (
            <Col className='mx-3 mb-5 follower-column'>
              <FollowingCard follower={follower}/>
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