import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import { useCustomerAuthContext } from "../../../hooks/useCustomerAuthContext";

const CustomerDashboard = () => {
  const { customerAuthState } = useCustomerAuthContext();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({});

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/customer/info";

    if (customerAuthState.token === "") {
      navigate("/customer/login");
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAuthState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setCustomerDetails(data);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
      });
  }, []);

  return (
    <>
      <div className="customer-dashboard">
        <div className="background-image">
          <CustomerNavbar />

          <div className="main-container">
            <div className="left-side">
              <div className="left-div">
                <Link to="offers">
                  <button className="dashboard-button">Explore Offers</button>
                </Link>
                <Link to="restaurants">
                  <button className="dashboard-button">Order Now!</button>
                </Link>
                <Link to="recommended">
                  <button className="dashboard-button">Recommended</button>
                </Link>
              </div>
            </div>

            <div className="content-side">
              <div className="content">
                <h1>Welcome Back, {customerDetails.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
