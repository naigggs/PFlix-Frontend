import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listProducts, deleteProduct } from "../Actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";
import DeletedProductScreen from "./DeletedProductScreen";
import { listUsers } from "../Actions/accountActions";
import axios from "axios";
import CancelSubscriptionAdmin from "../Components/CancelSubscriptionAdmin";

const UserListScreen = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    const clientId =
      "AfaDIaxkUIVCOSL4vVELXUyWdygoJ9-DXKOKREzAfFaU_eUCQUm5ZMC8zWzHLjyEwPlNOGG8QPVOsNM4";
    const clientSecret =
      "EIWP_v_JLzT4aqURapVMAmWQHs2gc_yRZtcmiunJC50Cki5O7lmQgi2IHA6q56rwAaqOCaUatkokRGZo";
    // dispatch(getUserDetails("profile"));
    if (!accessToken) {
      const getToken = async () => {
        try {
          const response = await axios({
            method: "post",
            url: "https://api.sandbox.paypal.com/v1/oauth2/token",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            data: "grant_type=client_credentials",
          });

          console.log(response.data);
          setAccessToken(response.data.access_token);
        } catch (error) {
          console.error(error);
        }
      };

      getToken();

      const intervalId = setInterval(() => {
        getToken();
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [accessToken]);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, []);
  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }
  return (
    <div>
      <div className="text-center">
        <br />
        <h3>User LIST</h3>
        <Form>
          <Row>
            <Col md={3} />
            <Col md={6}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-1"
                aria-label="Search"
              />
            </Col>
          </Row>
        </Form>
        <br />
        <div class="container">
          <div class="row">
            <div class="row justify-content-center mt-10">
              <Link to="/signup" className="btn btn-primary">
                Add User
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Subscription Status</th>
            <th>Subscription ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <tbody>
            {users
              .filter((user) => {
                return search.toLowerCase() === ""
                  ? user
                  : user.email.toLowerCase().includes(search) ||
                      user.first_name.toLowerCase().includes(search) ||
                      user.last_name.toLowerCase().includes(search);
              })
              .map((users) => {
                return (
                  <tr key="">
                    <td>{users.first_name}</td>

                    <td>{users.last_name}</td>
                    <td>{users.email}</td>
                    <td>
                      {users.isSubscriber ? (
                        <div>Active</div>
                      ) : (
                        <div>Inactive</div>
                      )}
                    </td>
                    <td>{users.subscription_id}</td>
                    <td>
                      <div class="d-grid gap-1">
                      <CancelSubscriptionAdmin subscriptionId={users.subscription_id} accessToken={accessToken} id={users._id} />
                        {/* <Button variant='primary' className='btn-md'>
                        <i className='fas fa-edit'></i>
                      </Button> */}
                        <LinkContainer style={{
                           width:'3.75rem'
                           
                        
                          }} to={`/updateuserinfo/${users._id}`}>
                          <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default UserListScreen;
