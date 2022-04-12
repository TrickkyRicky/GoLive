//React
import React from 'react'

//Bootstrap
import { Container, Row, Col, Button, Image } from 'react-bootstrap'

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faAngleDown} from '@fortawesome/free-solid-svg-icons'

import ThumbnailPhoto from '../../assets/Yassuo-Thumbnail.jpg';
import MediaVideoCard from '../MediaVideoCard'

const Media = () => {

  const videos = [
    {
      id: 1,
      title: "How to 1v9 Every Game!!",
      description: "This game I am able to win the fight by making sure I farm as much minions as I possibly could... ",
      type: "Stream",
      thumbnail: ThumbnailPhoto
    },
    {
      id: 2,
      title: "I beat my wordle first try ...",
      description: "I found the word ‘Movie’ by luck when attempting to solve the Wordle game",
      type: "Video",
      thumbnail: ThumbnailPhoto
    },
    {
      id: 3,
      title: "Ultimate Trio w/ Nadeshot!",
      description: "I played COD with my friends Cloakzy & Nadeshot, and ended up winning 3 games!",
      type: "Clip",
      thumbnail: ThumbnailPhoto
    }
  ]



  return (
    <Container className='media-container'>
      <Row className='media-searchbar-row-width mt-4 mx-auto background-custom background-radius-custom'>
        <Col xs={8} sm={8} lg={8} xl={8} xxl={8} className='mt-1 px-3 border-right'>
          <input type="text" className='search-input' placeholder='Search for Content...'/>
        </Col>    
        <Col xs={2} sm={2} lg={2} xl={2} xxl={2} className='px-2'>
          <Button className="searchbar-all-button">
            <div className='down-text'>All</div>
            <div className='down-icon-div'><FontAwesomeIcon className='down-icon' icon={faAngleDown}/> </div>
          </Button>  
        </Col>    
        <Col xs={2} sm={2} lg={2} xl={2} xxl={2} className='pe-3'>         
          <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
        </Col>
      </Row>
      <Row className='media-videos-row-width mx-auto mt-5'>
        <Col className='px-0 pb-3 blue-border-bottom'>
          <MediaVideoCard />
        </Col>
      </Row>
    </Container>
  )
}


export default Media
