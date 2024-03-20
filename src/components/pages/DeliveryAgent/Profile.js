import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import DeliveryAgentNavbar from "./DeliveryAgentNavbar";
import { useDeliveryAgentAuthContext } from "../../../hooks/useDeliveryAgentAuthContext";

const DeliveryAgentProfile = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [username, setUsername] = useState("");

    const { deliveryAgentAuthState } = useDeliveryAgentAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/deliverer/info";

        if (deliveryAgentAuthState.token === "") {
            navigate("/deliverer/login");
            return;
        }
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setName(data.name);
                        setNumber(data.phone);
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
                navigate("/delivery-agent/login");
                alert("An error occurred. Please try again later.");
            });
    }, []);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = process.env.REACT_APP_BACKEND_URL + "/api/deliverer/info";
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
            },
            body: JSON.stringify({
                name: name,
                phone: number,
                email: username,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        alert("Details Updated Successfully");
                        setIsEditing(false);
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
    };

    return (
        <>
            <div className="delivery-agent-profile">
                <div className="all-container">
                    <DeliveryAgentNavbar />

                    <div className="main-container">
                        <div className="title">Profile</div>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <div className="detail">
                                    <div className="detail-title">Name:</div>
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Phone Number:</div>
                                    <div className="input-box">
                                        <input
                                            type="phone"
                                            name="phone"
                                            placeholder="Phone Number"
                                            required
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Email:</div>
                                    <div className="detail-value">{username}</div>
                                </div>
                                <div className="save-button">
                                    <button className="input-button" type="Submit">
                                        Save Details
                                    </button>
                                </div>
                            </form>
                        ) : (
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

                                <div className="edit-button">
                                    <button
                                        className="input-button"
                                        onClick={() => {
                                            setIsEditing(true);
                                        }}
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeliveryAgentProfile;