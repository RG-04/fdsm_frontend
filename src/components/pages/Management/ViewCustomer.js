import React, { useState, useEffect } from "react";
import "./ViewCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementViewCustomer = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const { managementAuthState } = useManagementAuthContext();

  const navigate = useNavigate();

  const { customerID } = useParams();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/management/customer/" + customerID;

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
            setName(data.name);
            setNumber(data.phone);
            setAddress(data.address);
            setUsername(data.email);
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

  const [isEditing, setIsEditing] = useState(false);

  const handleOrdersClick = (e) => {
    e.preventDefault();
    //TODO
  };

  return (
    <>
      <div className="management-view-customer">
        <div className="all-container">
          <ManagementNavbar />

          <div className="main-container">
            <div className="title">Customer Info</div>
              <div className="profile-details">
                <div className="detail">
                  <div className="detail-title">Name:</div>
                  <div className="detail-value">{name}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Phone Number:</div>
                  <div className="detail-value">{number}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Email:</div>
                  <div className="detail-value">{username}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Address:</div>
                  <div className="detail-value">{address}</div>
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

export default ManagementViewCustomer;
