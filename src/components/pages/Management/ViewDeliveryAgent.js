import React, { useState, useEffect } from "react";
import "./ViewDeliveryAgent.css";
import { useNavigate, useParams } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementViewDeliveryAgent = () => {
  const [deliveryAgentInfo, setDeliveryAgentInfo] = useState({ reviews: [] });
  const [workingStatus, setWorkingStatus] = useState(0); // 0: not available, 1: available, 2: on delivery
  const { managementAuthState } = useManagementAuthContext();

  const navigate = useNavigate();

  const { deliveryAgentID } = useParams();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/management/deliverer/" + deliveryAgentID;

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
            setDeliveryAgentInfo(data);
            setWorkingStatus(data.workingStatus);
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
        navigate("/management/login");
        alert("An error occurred. Please try again later.");
      });
  }, []);

  const handleOrdersClick = (e) => {
    e.preventDefault();
    navigate("/management/delivery-agent/" + deliveryAgentID + "/orders");
  };

  const getStatus = () => {
    if (workingStatus === 0) {
      return "Not Available";
    } else if (workingStatus === 1) {
      return "Available";
    } else if (workingStatus === 2) {
      return "On Delivery";
    }
  };

  return (
    <>
      <div className="management-view-delivery-agent">
        <div className="all-container">
          <ManagementNavbar />

          <div className="main-container">
            <div className="title">Delivery Agent Info</div>
            <div className="profile-details">
              <div className="detail">
                <div className="detail-title">Name:</div>
                <div className="detail-value">{deliveryAgentInfo.name}</div>
              </div>
              <div className="detail">
                <div className="detail-title">Phone Number:</div>
                <div className="detail-value">{deliveryAgentInfo.phone}</div>
              </div>
              <div className="detail">
                <div className="detail-title">Email:</div>
                <div className="detail-value">{deliveryAgentInfo.email}</div>
              </div>
              <div className="detail">
                <div className="detail-title">Status:</div>
                <div className="detail-value">{getStatus()}</div>
              </div>

              <div className="orders-button">
                <button onClick={handleOrdersClick}>View Orders</button>
              </div>
            </div>
          </div>
          {deliveryAgentInfo.reviews.length ? (
          <div className="main-container reviews">
            <div className="title">
              <h1>Reviews</h1>
            </div>
            <div className="review-list">
              {deliveryAgentInfo.reviews.map((review) => (
                <div className="review">
                  <div className="review-rating">{"⭐".repeat(review.rating)}</div>
                  <div className="review-name">{review.poster.name}</div>
                  <div className="review-comment">{review.comment}</div>
                </div>
              ))}
            </div>
          </div>
          ) : (<></>)}
        </div>
      </div>
    </>
  );
};

export default ManagementViewDeliveryAgent;
