// import axios from 'axios'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  editProduct,
  listProductDetails,
} from "../Actions/productActions";
import { Link, useParams } from "react-router-dom";
import { listGenres } from "../Actions/genreActions";
import { listDirectors } from "../Actions/directorActions";

function EditProductScreen() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddProductInfo = async () => {
    let formField = new FormData();

    formField.append("name", name);
    formField.append("description", description);
    formField.append("director", director);
    formField.append("genre", genre);
    formField.append("genre_two", genre_two);
    formField.append("genre_three", genre_three);

    if (image !== null) {
      formField.append("image", image);
    }
    if (video !== null) {
      formField.append("video", video);
    }

    dispatch(editProduct(id, formField)).then((response) => {
      navigate("/movielist");
    });
  };

  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;
  useEffect(() => {
    dispatch(listGenres());
    setGenre(genres);
  }, []);

  const directorList = useSelector((state) => state.directorList);
  const { directors } = directorList;
  useEffect(() => {
    dispatch(listDirectors());
  }, []);

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [genre_two, setGenreTwo] = useState("");
  const [genre_three, setGenreThree] = useState("");
  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !image ||
      !video ||
      !description ||
      !director ||
      !genre ||
      !genre_two ||
      !genre_three
    ) {
      setError("All fields are required");
      return;
    } else {
      AddProductInfo();
    }
  };
  return (
    <div>
      <br />
      <div class="text-center" variant="light">
        <h1>Edit Movie Info</h1>
      </div>
      <Container>
        <Link className="btn btn-light my-3" to="/movielist">
          Go Back
        </Link>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Video File</Form.Label>
            <Form.Control
              type="file"
              id="video"
              name="video"
              className="form-control"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              id="description"
              name="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre #1</Form.Label>
            <Form.Control
              as="select"
              id="director"
              name="director"
              className="form-control"
              placeholder="Please Select"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">-- Please select --</option>
              {genres.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre #2</Form.Label>
            <Form.Control
              as="select"
              id="director"
              name="director"
              className="form-control"
              placeholder="Please Select"
              value={genre_two}
              onChange={(e) => setGenreTwo(e.target.value)}
            >
              <option value="">-- Please select --</option>
              {genres.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre #3</Form.Label>
            <Form.Control
              as="select"
              id="director"
              name="director"
              className="form-control"
              placeholder="Please Select"
              value={genre_three}
              onChange={(e) => setGenreThree(e.target.value)}
            >
              <option value="">-- Please select --</option>
              {genres.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Director</Form.Label>
            <Form.Control
              as="select"
              id="director"
              name="director"
              className="form-control"
              placeholder="Please Select"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            >
              <option value="">-- Please select --</option>
              {directors.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.firstname} {item.lastname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div style={{ fontSize: 22 }}>{error && <div>{error}</div>}</div>
          <br />
          <Button className="btn btn-primary" onClick={handleSubmit}>
            Add Product
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EditProductScreen;
