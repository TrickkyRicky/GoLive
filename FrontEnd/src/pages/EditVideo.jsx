import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { editVideo } from "../store/user/user-actions";
import { getVideoData } from "../store/content/content-actions";

import { Navigate, Link, useParams } from "react-router-dom";

const EditVideo = () => {
  const dispatch = useDispatch();
  let { videoId } = useParams();

  const auth = useSelector((state) => state.auth);

  const contentState = useSelector((state) => state.content);

  const [values, setValues] = useState({
    id: '',
    title: '',
    description: '',
    category: '',
    thumbnail: '',
    inputKey: ''
  });

  const handleChange = (e, field) => {
    let value = (field == 'thumbnail') ? e.target.files[0] : e.target.value;

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
    values.thumbnail && newVideo.append('thumbnail', values.thumbnail);

    dispatch(editVideo(auth.jwtToken, newVideo, videoId));

    setValues({
      title: '',
      description: '',
      category: '',
      thumbnail: '',
      inputKey: Date.now()
    })
  }

  useEffect(() => {
      getVideoData(videoId).then((data) => {
        setValues({
            id: data._id,
            title: data.title,
            description: data.description,
            category: data.category
          })
      })
  }, []);

  if (contentState.redirect) {
    return <Navigate to="/settings" />;
  }

  return (
    <div>
        <div>
          <h2 id="contained-modal-title-vcenter">Edit Video</h2>
        </div>
        <div>
          <Form className="upload-form">

            <Form.Group className="mb-3" controlId="formTitle">
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

            <Image className="video-thumbnail" width="300"
                src={
                values.id
                    ? "http://localhost:8080/content/thumbnail/" + values.id
                    : "http://localhost:8080/content/defaultThumbnail"
                }
                alt="thumbnail"
            />

            <Form.Group controlId="formThumbnailFile" className="mb-3">
              <Form.Label>Upload Thumbnail</Form.Label>
              <Form.Control type="file" onChange={(e) => handleChange(e, 'thumbnail')} accept="image/*" key={values.inputKey} />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Select Category"  onChange={(e) => handleChange(e, "category")} value={values.category}>
                <option>Select Category</option>
                {
                  contentState.categories.map((category, i) => {
                    return (
                      <option key={i} value={category.title}>{category.title}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>

            <div>
                <Link to="/settings">Cancel</Link>
            </div>
            <button type="submit" className="publish-btn" onClick={clickSubmit}>
              Update
            </button>
          </Form>
        </div>
    </div>
  );
};

export default EditVideo;