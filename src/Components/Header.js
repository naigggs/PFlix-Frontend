import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../Actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const [show, setShow] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/login");
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src="../images/pflixlogo.png"
              width="80"
              height="35"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link
                to="/"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fa fa-home" aria-hidden="true"></i> Home
              </Link>
              <Link
                to="/genres"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fa fa-video-camera" aria-hidden="true"></i> Genres
              </Link>

              {userInfo ? (
                <Link
                  to="/mylist"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i class="fa fa-list-ul" aria-hidden="true"></i> Mylist
                </Link>
              ) : (
                <div />
              )}

              {userInfo ? (
                !userInfo.isAdmin ? (
                  <div />
                ) : (
                  <Link
                    to="/movielist"
                    type="button"
                    class="btn btn-black"
                    style={{ color: "#FFF" }}
                  >
                    <i class="fa fa-list-ul" aria-hidden="true"></i> MovieList
                  </Link>
                )
              ) : (
                <div />
              )}
              {userInfo ? (
                !userInfo.isAdmin ? (
                  <div />
                ) : (
                  <Link
                    to="/userlist"
                    type="button"
                    class="btn btn-black"
                    style={{ color: "#FFF" }}
                  >
                    <i class="fa fa-list-ul" aria-hidden="true"></i> UserList
                  </Link>
                )
              ) : (
                <div />
              )}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Link
                to="/plans"
                type="button"
                class="btn btn-black"
                style={{ color: "#FFF" }}
              >
                <i class="fa-solid fa-ticket"></i> Plans
              </Link>
              {userInfo ? (
                <Link
                  to="/userprofile"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fas fa-user"></i> {userInfo.first_name} {""}
                  {userInfo.last_name}
                </Link>
              ) : (
                <Link
                  to="/signup"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i class="fa-solid fa-user-plus"></i> Sign up
                </Link>
              )}
              {userInfo ? (
                <Link
                  onClick={logoutHandler}
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  type="button"
                  class="btn btn-black"
                  style={{ color: "#FFF" }}
                >
                  <i className="fas fa-user"></i> Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
