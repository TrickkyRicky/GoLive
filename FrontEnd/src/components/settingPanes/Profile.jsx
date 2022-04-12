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
        <Col className='left-side pt-5 pb-5 me-5' sm={5} md={4} lg={3} xl={3} xxl={3} xtl={2}>
          <div className='pb-3'>
            <Image className='avatar-image' src={ProfilePicture} alt="Profile Picture"/>
          </div>
          <div className='upload-button-width'>
            <button className='upload-button py-1'>Upload Photo</button>
          </div>
          <div className='mt-5'>
            <h2 className='description-title'>Description</h2>
          </div>
          <div className='description-box-width '>
            <input className='description-input'/>
          </div>
        </Col>
        <Col className='right-side' sm={6} md={6} lg={5} xl={5} xxl={4}> 
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Name</h1>
              <input placeholder='Samer Ali' className='input py-2 ps-3'/>
            </div>
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Username</h1>
              <input placeholder='Samerali97' className='input py-2 ps-3'/>
            </div>
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Email</h1>
              <input placeholder='Samer.Ali@Cognizant.com' className='input py-2 ps-3'/>
            </div>
            <div className='user-information pt-3'>
              <h1 className='title ps-3'>Password</h1>
              <input placeholder='Samer123' className='input py-2 ps-3'/>
            </div>
            <div className='submit-button pt-3 mt-5'>
              <button  className='button py-3'>Submit Changes</button>
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
//                       <div className="custom-padding">{userInformation.username}</div>
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