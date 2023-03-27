import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Button,
} from "react-bootstrap";
import { useSubscription } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logout } from "../Actions/accountActions";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  usePayPalSubscription,
} from '@paypal/react-paypal-js';
import CancelSubscription from "../Components/CancelSubscription";
import axios from 'axios';

import { getUserDetails } from '../Actions/accountActions'

function UserProfileScreen() {
  const [subscription, setSubscription] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  if (!userInfo) {
    navigate("/login");
  }
  const userInfo1 = JSON.parse(localStorage.getItem('userInfo'));
  const subscriptionId = userInfo1.subscription_id
  const [planName, setPlanName] = useState(null);
  const [nextPaymentDue, setNextPaymentDue] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails
  // console.log('test', user.subscription_id)

  useEffect(() => {
    const clientId = 'AfaDIaxkUIVCOSL4vVELXUyWdygoJ9-DXKOKREzAfFaU_eUCQUm5ZMC8zWzHLjyEwPlNOGG8QPVOsNM4';
    const clientSecret = 'EIWP_v_JLzT4aqURapVMAmWQHs2gc_yRZtcmiunJC50Cki5O7lmQgi2IHA6q56rwAaqOCaUatkokRGZo';
    dispatch(getUserDetails('profile'))
    if (!accessToken) {
      const getToken = async () => {
        try {
          const response = await axios({
            method: 'post',
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
            },
            data: 'grant_type=client_credentials'
          });

          console.log(response.data)
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

    axios({
      method: 'GET',
      url: `https://api.sandbox.paypal.com/v1/billing/subscriptions/${user.subscription_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setSubscription(response.data);
        return response.data.plan_id;
      })
      .then(planId => {
        return axios({
          method: 'GET',
          url: `https://api.sandbox.paypal.com/v1/billing/plans/${planId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
      })
      .then(response => {
        setPlanName(response.data.name);
      })
      .catch(error => {
        console.error(error);
      });
  }, [accessToken, subscriptionId, userInfo]);
  useEffect(() => {
    if (subscription) {
      const nextBillingTime = new Date(subscription.billing_info.next_billing_time);
      setNextPaymentDue(nextBillingTime.toLocaleDateString());
    }
  }, [subscription, subscriptionId, userInfo]);

  if (!subscription || !planName || !nextPaymentDue) {
    return <div>Loading subscription details...</div>;
  }

  console.log(userInfo.isSubscriber)
  return (
    <>
      <Card style={{ margin: "auto", width: "80rem" }}>
        <Card.Img variant="bottom" src="../images/AccountOverview.png" />
      </Card>
      <br />
      <div>
        <h1
          style={{
            display: "flex",
            fontWeight: "bolder",
            justifyContent: "center",
            fontSize: 50,
          }}
        >
          Account overview
        </h1>
      </div>

      <CardGroup style={{ margin: "auto", width: "80rem" }}>
        <Card>
          <Card.Img variant="top" src="../images/ProfileIMG2.png" />
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 30,
                color: "black",
              }}
            >
              PROFILE
            </Card.Title>
            <h4 className="text-muted fw-light" style={{ fontWeight: "bold" }}>
              Name:{" "}
              <xxl
                className="card-title"
                style={{ fontWeight: "bold", color: "black" }}
              >
                {userInfo.first_name} {userInfo.last_name}
              </xxl>
            </h4>
            {/* <h4 className='text-muted fw-light' style={{ fontWeight: 'bold'}} >Last Name: <xxl className='card-title' style={{ fontWeight: 'bold', color: 'black'}} >{userInfo.last_name}</xxl></h4>           */}
            <h4 className="text-muted fw-light" style={{ fontWeight: "bold" }}>
              Email:{" "}
              <xxl
                className="card-title"
                style={{ fontWeight: "bold", color: "black" }}
              >
                {userInfo.email}
              </xxl>
            </h4>
            <h4 className="text-muted fw-light" style={{ fontWeight: "bold" }}>
              Password:{" "}
              <xxl
                className="card-title"
                style={{ fontWeight: "bold", color: "black" }}
              ></xxl>
            </h4>
          </Card.Body>
          <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Button
              as={Link}
              to="/updateuserprofile"
              variant="dark"
              className="rounded"
            >
              Edit Profile
            </Button>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="../images/PlanIMG2.png" />
          <Card.Body>
            <Card.Title
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: 30,
                color: "black",
              }}
            >
              SUBSCRIPTION DETAILS
            </Card.Title>
            <h4 className="text-muted fw-light" style={{ fontWeight: "bold" }}>
              Current Plan:
              <xxl
                className="card-title"
                style={{ fontWeight: "bold", color: "black" }}
              >
                {planName}
              </xxl>
            </h4>
            <h4 className="text-muted fw-light" style={{ fontWeight: "bold" }}>
              Status:
              <xxl
                className="card-title"
                style={{ fontWeight: "bold", color: "black" }}
              >
                {subscription.status}
              </xxl>
            </h4>
            <h4 className="text-muted fw-light" style={{ fontWeight: "bold" }}>
              Next Payment Due:
              <xxl
                className="card-title"
                style={{ fontWeight: "bold", color: "black" }}
              >
                {nextPaymentDue}
              </xxl>
            </h4>
          </Card.Body>
          <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
            <CancelSubscription subscriptionId={subscriptionId} accessToken={accessToken} />

          </Card.Footer>
        </Card>
      </CardGroup>

      {/* <Card className="my-3 p-3 rounded" style={{ margin: 'auto', width: '80rem', backgroundColor:'	#333333', color: 'white' }}>
      <Card.Header style={{display: 'flex', justifyContent: 'center', fontSize: 30}}>PROFILE</Card.Header>
      <Card.Body>
        <Card.Title style={{display: 'flex', justifyContent: 'center'}}>First Name: {userInfo.fname}</Card.Title>
        <Card.Title style={{display: 'flex', justifyContent: 'center'}}>Last Name: {userInfo.lname}</Card.Title>
        <Card.Title style={{display: 'flex', justifyContent: 'center'}}>Email: {userInfo.email}</Card.Title>
        <Card.Title style={{display: 'flex', justifyContent: 'center'}}>Password: </Card.Title>

        <Button variant="dark" style={{justifyContent: 'center'}}>Edit Profile</Button>
      </Card.Body>
    </Card>
    <Card className="my-3 p-3 rounded" style={{ margin: 'auto', width: '80rem', backgroundColor:'	#333333', color: 'white' }}>
      <Card.Header style={{display: 'flex', justifyContent: 'center', fontSize: 30}}>PLAN</Card.Header>
      <Card.Body>
        <Card.Title style={{display: 'flex', justifyContent: 'center'}}>First Name: {userInfo.fname}</Card.Title>

        <Button variant="dark" style={{justifyContent: 'center'}}>Edit Plan</Button>
      </Card.Body>
    </Card> */}
    </>
  );
}

export default UserProfileScreen;
