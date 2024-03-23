import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import RestaurantNavbar from "./RestaurantNavbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";

const RestaurantProfile = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [tags, setTags] = useState("");
    const [timings, setTimings] = useState("");
    const [imageSrc, setImageSrc] = useState("");

    const { restaurantAuthState } = useRestaurantAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/info";

        if (restaurantAuthState.token === "") {
            navigate("/restaurant/login");
            return;
        }
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${restaurantAuthState.token}`,
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
                        setTags(data.tags);
                        setTimings(data.timings);
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
                navigate("/restaurant/login");
                alert("An error occurred. Please try again later.");
            });
    }, []);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/info";
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${restaurantAuthState.token}`,
            },
            body: JSON.stringify({
                name: name,
                phone: number,
                address: address,
                tags: tags,
                timings: timings,
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
            <div className="restaurant-profile">
                <div className="all-container">
                    <RestaurantNavbar />

                    <div className="main-container">
                        <div className="title">Restaurant Info</div>
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
                                <div className="detail">
                                    <div className="detail-title">Address:</div>
                                    <div className="input-box">
                                        <textarea
                                            name="address"
                                            placeholder="Address"
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Tags:</div>
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            name="tags"
                                            placeholder="Tags"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Timings:</div>
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            name="timings"
                                            placeholder="Timings"
                                            required
                                            value={timings}
                                            onChange={(e) => setTimings(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Image:</div>
                                    <div className="input-box">
                                        <input
                                            type="text"
                                            name="image"
                                            placeholder="Image URL"
                                            value={imageSrc}
                                            onChange={(e) => setImageSrc(e.target.value)}
                                        />
                                    </div>
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
                                <div className="detail">
                                    <div className="detail-title">Address:</div>
                                    <div className="detail-value">{address}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Tags:</div>
                                    <div className="detail-value">{tags}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Timings:</div>
                                    <div className="detail-value">{timings}</div>
                                </div>
                                <div className="detail">
                                    <div className="detail-title">Image:</div>
                                    <div className="detail-value">
                                        <img src={imageSrc} alt="Restaurant" />
                                    </div>
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

export default RestaurantProfile;
