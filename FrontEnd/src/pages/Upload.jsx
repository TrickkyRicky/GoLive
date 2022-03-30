import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";

import { uploadVideo } from "../store/user/user-actions";
import { listCategories } from "../store/content/content-actions";
import { contentActions } from "../store/content/content-slice";

const Upload = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => {
    return {
      userId: state.auth.userIdLogin,
      isAuth: state.auth.isAuth,
      jwt: state.auth.jwtToken,
    };
  });

  const isShown = useSelector((state) => state.content.showUploadModal);

  const [values, setValues] = useState({
    title: '',
    description: '',
    category: '',
    isStreamed: 'false',
    video: '',
    thumbnail: ''
  });

  const categoryNames = useSelector((state) => state.content.categoryNames);

  const handleChange = (e, field) => {
    let value = (field == 'video' || field == 'thumbnail') ? e.target.files[0] : e.target.value;

    setValues({
      ...values,
      [field]: value
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    let newVideo = new FormData();

    values.title && newVideo.append('title', values.title);
    values.description && newVideo.append('description', values.description);
    values.category && newVideo.append('category', values.category);
    values.isStreamed && newVideo.append('isStreamed', values.isStreamed);
    values.video && newVideo.append('video', values.video);
    values.thumbnail && newVideo.append('thumbnail', values.thumbnail);

    dispatch(uploadVideo(auth.jwt, newVideo));
  }

  const hideModal = () => {
    dispatch(contentActions.showUploadModal(false));
  }

  useEffect(() => {
    dispatch(listCategories());
  }, []);

  return (
    <Modal
        show={isShown}
        onHide={hideModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h2 id="contained-modal-title-vcenter">
            UPLOAD A VIDEO
          </h2>
        </Modal.Header>
        <Modal.Body>
          <Form className="upload-form">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Video</Form.Label>
              <Form.Control type="file" onChange={(e) => handleChange(e, 'video')}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Video Title"
                onChange={(e) => handleChange(e, "title")}
                value={values.title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Video Description"
                onChange={(e) => handleChange(e, "description")}
                value={values.description}
              />
            </Form.Group>

            <Form.Group controlId="formThumbnailFile" className="mb-3">
              <Form.Label>Upload Thumbnail</Form.Label>
              <Form.Control type="file" onChange={(e) => handleChange(e, 'thumbnail')}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Select Category"  onChange={(e) => handleChange(e, "category")} value={values.category}>
                <option>Select Category</option>
                {
                  categoryNames.map((title, i) => {
                    return (
                      <option key={i} value={title}>{title}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>

            <button type="submit" className="publish-btn" onClick={clickSubmit}>
              Publish
            </button>
          </Form>
        </Modal.Body>
      </Modal>
  );
};

export default Upload;
