//React
import { React, useState, useEffect } from 'react'

//Bootstrap
import {Row, Col, Image, Form} from "react-bootstrap";

//Assets
import ProfilePicture from '../../assets/CourageJD.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'

//Redux
import { getUser, updateUser } from "../../store/user/user-actions";
import { useDispatch } from "react-redux";

const Profile = ( props ) => {

  const dispatch = useDispatch();

  const [userInformation, setUserInformation] = useState({
    avatar: '',
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e, field) => {
    let value = (field === 'avatar') ? e.target.files[0] : e.target.value;

    setUserInformation({
      ...userInformation,
      [field]: value
    })
  }

  //This Function will be removed, as we don't use a form (we use an edit icon + modal). Keeping clickSubmit function for
  //visuals only.
  
  // const clickSubmit = (e) => {
  //   e.preventDefault();

  //   let updatedUser = new FormData();
  //   userInformation.username && updatedUser.append('username', userInformation.username);
  //   userInformation.fullname && updatedUser.append('fullname', userInformation.fullname);
  //   userInformation.email && updatedUser.append('email', userInformation.email);
  //   userInformation.password && updatedUser.append('password', userInformation.password);
  //   userInformation.avatar && updatedUser.append('avatar', userInformation.avatar);

  //   dispatch(updateUser(props.jwt, updatedUser))
  // }

  useEffect(() => {
      dispatch(getUser(props.jwt))
      .then((data) => {
        setUserInformation({
          ...userInformation,
          username: data.username,
          email: data.email
        })
      });
  }, []);

  return (
    <Row>
        <Col></Col>
        <Col xs={8}>
          <Row>
            <Col></Col>
            <Col xs={3}>
              <div className="profile-picture"></div>
              <div>
                <Image className='avatar-image' src={ProfilePicture} alt="Profile Picture"/>
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row className="form">
            <Col></Col>
            <Col xs={8} className="pt-5">
              <Form>
                <Row>
                  <Col>
                    <Form.Label className="form-label-leftside mb-0">Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label className="form-label-rightside mb-0">
                      <div className="custom-padding">Temp Name</div>
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
                      <div className="custom-padding">{userInformation.username}</div>
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


{/* <Col xs={2}>
  <div className="profile-picture">
    
  </div>
</Col> */}