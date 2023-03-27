// import axios from 'axios'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addGenre } from "../Actions/genreActions";
import { Link } from "react-router-dom";
import { addDirector } from "../Actions/directorActions";

function AddDirectorScreen() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [image, setImage] = useState(null);
  
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddDirectorInfo = async () => {
    let formField = new FormData();

    formField.append("firstname", firstname);
    formField.append("lastname", lastname);

    dispatch(addDirector(formField)).then((response) => {
      navigate("/movielist");
    });
  };
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

    if (!firstname || !lastname) {
      setError("All fields are required");
      return;
    } else {
      AddDirectorInfo();
    }
  };

  return (
    <div>
      <br />
      <div class="text-center" variant="light">
        <h1>Add Director</h1>
      </div>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          

          <div style={{ fontSize: 22 }}>{error && <div>{error}</div>}</div>
          <br />
          <Button className="btn btn-primary" onClick={handleSubmit}>
            Add Director
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddDirectorScreen;
