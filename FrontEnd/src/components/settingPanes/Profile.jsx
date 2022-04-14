//React
import React, { useState, useEffect } from 'react';

//Bootstrap
import {Row, Col, Image, Form} from "react-bootstrap";

//Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'

//Redux
import { getUser, updateUser } from "../../store/user/user-actions";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [values, setValues] = useState({
    avatar: '',
    username: '',
    email: '',
    about: '',
    password: '',
    inputKey: ''
  });

  const handleChange = (e, field) => {
    let value = (field === 'avatar') ? e.target.files[0] : e.target.value;

    setValues({
      ...values,
      [field]: value
    })
  }

  useEffect(() => {
    if(auth.jwtToken) {
      dispatch(getUser(auth.jwtToken))
    }
  }, [auth.jwtToken]);
  
  const clickSubmit = (e) => {
    e.preventDefault();

    let updatedUser = new FormData();

    values.username && updatedUser.append('username', values.username);
    values.email && updatedUser.append('email', values.email);
    values.about && updatedUser.append('about', values.about);
    values.password && updatedUser.append('password', values.password);
    values.avatar && updatedUser.append('avatar', values.avatar);

    dispatch(updateUser(auth.jwtToken, updatedUser));

    setValues({
      avatar: '',
      username: '',
      email: '',
      about: '',
      password: '',
      inputKey: Date.now()
    })
  }

  return (
    <Row>
        <Col className='left-side pt-5 pb-5 me-5' sm={5} md={4} lg={3} xl={3} xxl={3} xtl={2}>
          <div className='pb-3'>
            <Image className='avatar-image' 
              src={
                user.id
                  ? "http://localhost:8080/user/avatar/" + user.id + "?" + new Date().getTime()
                  : "http://localhost:8080/user/defaultAvatar"
              }
              alt="avatar"
            />
          </div>
          <div className='upload-button-width'>
            <input className='upload-button py-1' type="file" key={values.inputKey} onChange={(e) => handleChange(e, 'avatar')} accept="image/*"/>
            {/* <button className='upload-button py-1'>Upload Photo</button> */}
          </div>
          <div className='mt-5'>
            <h2 className='description-title'>Description</h2>
          </div>
          <div className='description-box-width '>
            <input className='description-input' onChange={(e) => handleChange(e, "about")} value={values.about} />
          </div>
        </Col>
        <Col className='right-side' sm={6} md={6} lg={5} xl={5} xxl={4}> 
            {/* <div className='user-information pt-3'>
              <h1 className='title ps-3'>Name</h1>
              <input className='input py-2 ps-3'/>
            </div> */}
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Username</h1>
              <input className='input py-2 ps-3' onChange={(e) => handleChange(e, "username")} value={values.username} />
            </div>
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Email</h1>
              <input className='input py-2 ps-3' onChange={(e) => handleChange(e, "email")} value={values.email} />
            </div>
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Password</h1>
              <input className='input py-2 ps-3' onChange={(e) => handleChange(e, "password")} value={values.password}/>
            </div>
            <div className='submit-button pt-3 mt-5'>
              <button className='button py-3' onClick={clickSubmit}>Submit Changes</button>
            </div>
        </Col>       
      </Row>
  )
}

export default Profile;


// <Col></Col>
//         <Col xs={8}>
//           <Row>
//             <Col></Col>
//             <Col xs={3}>
//               <div className="profile-picture"></div>
//               <div>
//                 <Image className='avatar-image' src={ProfilePicture} alt="Profile Picture"/>
//               </div>
//             </Col>
//             <Col></Col>
//           </Row>
//           <Row className="form">
//             <Col></Col>
//             <Col xs={8} className="pt-5">
//               <Form>
//                 <Row>
//                   <Col>
//                     <Form.Label className="form-label-leftside mb-0">Name</Form.Label>
//                   </Col>
//                   <Col>
//                     <Form.Label className="form-label-rightside mb-0">
//                       <div className="custom-padding">Temp Name</div>
//                       <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
//                     </Form.Label>                                    
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col>
//                     <Form.Label className="form-label-leftside mb-0">Username</Form.Label>
//                   </Col>
//                   <Col>
//                     <Form.Label className="form-label-rightside mb-0">
//                       <div className="custom-padding">{values.username}</div>
//                       <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
//                     </Form.Label>                                    
//                   </Col>
//                 </Row>
//                 <Row className="mt-3">
//                   <Col>
//                     <Form.Label className="form-label-leftside mb-0">Password</Form.Label>
//                   </Col>
//                   <Col>
//                     <Form.Label className="form-label-rightside mb-0">
//                       <div className="custom-padding">Temp Password </div>
//                       <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
//                     </Form.Label>                                    
//                   </Col>
//                 </Row>
//                 <Row className="mt-3 mb-5">
//                   <Col>
//                     <Form.Label className="form-label-leftside mb-0">Email</Form.Label>
//                   </Col>
//                   <Col>
//                     <Form.Label className="form-label-rightside mb-0">
//                       <div className="custom-padding">Temp Email</div>
//                       <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
//                     </Form.Label>                                    
//                   </Col>
//                 </Row>
//               </Form>
//             </Col>
//             <Col></Col>
//           </Row>
//         </Col>
//         <Col></Col>