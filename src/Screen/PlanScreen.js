import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, Alert } from "react";
import { paymentUserSuccess } from "../Actions/accountActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "../Components/ButtonWrapper";
import ButtonWrapper1 from "../Components/ButtonWrapper1";
import ButtonWrapper2 from "../Components/ButtonWrapper2";

function PlanScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  return (
    <div className="container">
      <div className="text-center w-75 my-4 mx-auto">
        <h1>Plans</h1>
        <p className="fs-5 text-muted">Choose your plan.</p>
      </div>
      <main>
        <div className="row row-cols-1 row-cols-md-3">
          <div className="col">
            <div className="card text-center">
              <div className="card-header">
                <h4 className="fw-normal">Student Plan</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title">
                  Php 150<small className="text-muted fw-light">/month</small>
                </h1>
                <ul className="list-unstyled py-3">
                  <li>Enjoy your unlimited movies for 1 month.</li>
                  <li>Php 1800 billed every 12 months.</li>
                  <li>Watch all you want. Ad-free.</li>
                  <li>Change or cancel your plan anytime.</li>
                </ul>
                {userInfo ? (
                  !userInfo.isSubscriber ? (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AfaDIaxkUIVCOSL4vVELXUyWdygoJ9-DXKOKREzAfFaU_eUCQUm5ZMC8zWzHLjyEwPlNOGG8QPVOsNM4",
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                      }}
                    >
                      <ButtonWrapper type="subscription" />
                    </PayPalScriptProvider>
                  ) : (
                    <div />
                  )
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card text-center">
              <div className="card-header">
                <h4 className="fw-normal">Basic Plan</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title">
                  Php 600
                  <small className="text-muted fw-light">/6 months</small>
                </h1>
                <ul className="list-unstyled py-3">
                  <li>Binge-watch for 6 months.</li>
                  <li>Save up to 40%</li>
                  <li>Watch all you want. Ad-free.</li>
                  <li>Change or cancel your plan anytime.</li>
                </ul>
                {userInfo ? (
                  !userInfo.isSubscriber ? (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AfaDIaxkUIVCOSL4vVELXUyWdygoJ9-DXKOKREzAfFaU_eUCQUm5ZMC8zWzHLjyEwPlNOGG8QPVOsNM4",
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                      }}
                    >
                      <ButtonWrapper1 type="subscription" />
                    </PayPalScriptProvider>
                  ) : (
                    <div />
                  )
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card text-center">
              <div className="card-header">
                <h4 className="fw-normal">Premium Plan</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title">
                  Php 1000<small className="text-muted fw-light">/year</small>
                </h1>
                <ul className="list-unstyled py-3">
                  <li>Best Value</li>
                  <li>Save up to 57%</li>
                  <li>Watch all you want. Ad-free.</li>
                  <li>Change or cancel your plan anytime.</li>
                </ul>
                {userInfo ? (
                  !userInfo.isSubscriber ? (
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AfaDIaxkUIVCOSL4vVELXUyWdygoJ9-DXKOKREzAfFaU_eUCQUm5ZMC8zWzHLjyEwPlNOGG8QPVOsNM4",
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                      }}
                    >
                      <ButtonWrapper2 type="subscription" />
                    </PayPalScriptProvider>
                  ) : (
                    <div />
                  )
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default PlanScreen;

//PlanScreen.js
