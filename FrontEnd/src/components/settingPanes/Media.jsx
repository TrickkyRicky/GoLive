//React
import React from 'react'

//Bootstrap
import { Container, Row, Col, Button } from 'react-bootstrap'

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faAngleDown} from '@fortawesome/free-solid-svg-icons'

const Media = () => {
  return (
    <Container className='media-container'>
      <Row className='media-searchbar-row-width temp-green mt-4 mx-auto'>
        <Col xs={8} sm={8} lg={8} xl={8} xxl={8} className='mt-1 px-2 border-right'>
          <input type="text" className='search-input'/>
        </Col>    
        <Col xs={3} sm={3} lg={3} xl={3} xxl={3} className='px-2'>
          <Button>
            All <FontAwesomeIcon icon={faAngleDown}/> 
          </Button>  
        </Col>    
        <Col xs={1} sm={1} lg={1} xl={1} xxl={1}>
          <Button>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </Button>
        </Col>
      </Row>
      <Row className='media-videos-row-width mx-auto'>
        <Col>
          <p>Video Section</p>
        </Col>
      </Row>
    </Container>
  )
}


export default Media