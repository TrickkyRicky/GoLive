import React from 'react'

//Bootstrap
import { Container, Image, Row, Col } from "react-bootstrap";
const temporaryDescription = 'This is a random description that I wanted to include for visual purposes. I didnt know whether we shall implement Description Visual or Description Adjustment on this page.';
const About = () => {
  return (
    <Container className='about-container mx-0'>
      <Row className='pt-5'>
        <Col className='ps-2'>
          <h2 className='mb-4'>Description</h2>
          <textarea disabled className='description-textarea px-4 pt-2' rows={3} maxLength={153}>{temporaryDescription}</textarea>
        </Col>
      </Row>
      <Row className='pt-5'>
        <Col className='ps-2'>
          <h2 className='mb-4'>Details</h2>
          <Row className='description-background py-4 px-3'>
            <Col>
              <h2>Name</h2>
              <h2 className='pt-3'>Joined</h2>
              <h2 className='pt-3'>Total Views</h2>
              <h2 className='pt-3'>Location</h2>
            </Col>
            <Col>
              <h2>Samer Ali</h2>
              <h2 className='pt-3'>May 14, 2021</h2>
              <h2 className='pt-3'>1,903,417 Views</h2>
              <h2 className='pt-3'>Tampa, FL</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default About