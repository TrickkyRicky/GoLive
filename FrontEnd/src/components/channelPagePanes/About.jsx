import React from 'react'

//Bootstrap
import { Container, Image, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container className='about-container mx-0'>
      <Row className='pt-5'>
        <Col className='ps-2'>
          <h2 className='mb-4'>Description</h2>
          <textarea className='description-textarea px-4 pt-2' rows={3} maxLength={153}></textarea>
        </Col>
      </Row>
      <Row className='pt-5'>
        <Col className='ps-2'>
          <h2 className='description-title mb-4'>Details</h2>
          
        </Col>
      </Row>
    </Container>
  )
}

export default About