import React, { useState, useEffect } from "react";
import "./ViewDeliveryAgent.css";
import { useNavigate, useParams } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementViewDeliveryAgent = () => {
  const [deliveryAgentInfo, setDeliveryAgentInfo] = useState({});
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
                  <div className="detail-value">{() =>
                    {
                      console.log(deliveryAgentInfo.workingStatus)
                      if (deliveryAgentInfo.workingStatus === 0) {
                        return "Not available";
                      } else if (deliveryAgentInfo.workingStatus === 1) {
                        return "Available";
                      }
                      else if (deliveryAgentInfo.workingStatus === 2) {
                        return "On delivery";
                      }
                      else {
                        return "Unknown";
                      }
                    }
                  }</div>
                </div>

                <div className="orders-button">
                  <button onClick={handleOrdersClick}>View Orders</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementViewDeliveryAgent;
