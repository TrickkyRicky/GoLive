import React, { useState } from "react";
import { useDispatch } from "react-redux";

//Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

import { uploadVideo } from "../store/user/user-actions";

const Upload = (props) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: '',
    category: '',
    isStreamed: 'false',
    video: ''
  });

  const handleChange = (e, field) => {
    let value = (field == 'video') ? e.target.files[0] : e.target.value;

    setValues({
      ...values,
      [field]: value
    })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    let newVideo = new FormData();
    values.title && newVideo.append('title', values.title);
    values.category && newVideo.append('category', values.category);
    values.isStreamed && newVideo.append('isStreamed', values.isStreamed);
    values.video && newVideo.append('video', values.video);

    dispatch(uploadVideo(props.jwt, newVideo));
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form className="upload-form">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Video</Form.Label>
              <Form.Control type="file" onChange={(e) => handleChange(e, 'video')}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Video Title"
                onChange={(e) => handleChange(e, "title")}
                value={values.title}
              />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Video Category"
                onChange={(e) => handleChange(e, "category")}
                value={values.category}
              />

            </Form.Group>

            <Button variant="primary" type="submit" onClick={clickSubmit}>
              Publish
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Upload;
