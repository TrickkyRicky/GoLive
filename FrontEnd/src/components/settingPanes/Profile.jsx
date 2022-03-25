import React from 'react'
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {Container, Row, Col, Tab} from "react-bootstrap";

const Profile = () => {
  return (
    <Row>
        <Col></Col>
        <Col xs={8}>
          <Row>
            <Col></Col>
            <Col xs={2}><div className="profile-picture"></div></Col>
            <Col></Col>
          </Row>
          <Row className="form-background">
            <Col></Col>
            <Col xs={8} className="pt-5">
              <Form>
                <Row>
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Name </div>
                      <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Username</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Username </div>
                      <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Password </div>
                      <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
                <Row className="mt-3 mb-5">
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Email</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Email</div>
                      <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                    </Form.Label>                                    
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
  )
}

export default Profile;
