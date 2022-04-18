import React from "react";
import { useSelector, useDispatch } from "react-redux";

//Bootstrap
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

import { deleteVideo } from "../../store/user/user-actions";
import { userActions } from "../../store/user/user-slice";

import MediaVideoCard from '../MediaVideoCard';

const Media = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   if(auth.jwtToken) {
  //     dispatch(getUser(auth.jwtToken))
  //   }
  // }, [auth.jwtToken]);

  const handleChange = (e) => {
    let value = e.target.value.toLowerCase();

    dispatch(userActions.search(value));
  }

  const deleteVideoClick = (e, video) => {
    e.preventDefault();

    dispatch(deleteVideo(auth.jwtToken, video._id));
  }

  return (
    <Container className='media-container'>
      <Row className='media-searchbar-row-width mt-4 mx-auto background-custom background-radius-custom'>
        <Col xs={8} sm={8} lg={8} xl={8} xxl={8} className='mt-1 px-3 border-right'>
          <input type="text" className='search-input' placeholder='Search for Content...' onChange={handleChange}/>
        </Col>    
        <Col xs={2} sm={2} lg={2} xl={2} xxl={2} className='px-2'>
          <div className="searchbar-all-button">
            <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
          </div>  
        </Col>   
      </Row>
      <Row className='media-videos-row-width mx-auto mt-5'>
        <Col className='px-0 pb-3 blue-border-bottom'>
          {
            user.filteredData.map((video) => {
              return (
                <MediaVideoCard video={video} onDelete={deleteVideoClick} key={video._id}/>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}


export default Media;
