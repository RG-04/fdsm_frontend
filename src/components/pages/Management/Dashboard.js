import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementDashboard = () => {
  const { managementAuthState } = useManagementAuthContext();
  const navigate = useNavigate();
  const [ManagementDetails, setManagementDetails] = useState({});

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/management/info";

    if (managementAuthState.token === "") {
      navigate("/management/login");
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${managementAuthState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setManagementDetails(data);
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
      <div className="management-dashboard">
        <div className="background-image">
          <ManagementNavbar />

          <div className="main-container">
            <div className="left-side">
              <div className="left-div">
                <Link to="customers">
                  <button className="dashboard-button">View Customers</button>
                </Link>
                <Link to="restaurants">
                  <button className="dashboard-button">View Restaurants</button>
                </Link>
                <Link to="delivery-agents">
                  <button className="dashboard-button">View Delivery Agents</button>
                </Link>
                <Link to="offers">
                  <button className="dashboard-button">View Offers</button>
                </Link>
              </div>
            </div>

            <div className="content-side">
              <div className="content">
                <h1>Welcome Back, {ManagementDetails.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementDashboard;
