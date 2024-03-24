import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";
import postRestaurantImage from "../../../helpers/postRestaurantImage";

const RestaurantSignup = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState("");
  const [openTime, setOpenTime] = useState(0);
  const [closeTime, setCloseTime] = useState(0);
  const [image, setImage] = useState(null);

  const { setRestaurantAuthState } = useRestaurantAuthContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      username,
      password,
      name,
      number,
      address,
      tags,
      openTime,
      closeTime
    );

    const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/signup";
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: number,
        address: address,
        email: username,
        password: password,
        tags: tags.split(","),
        timings: {
          open: openTime,
          close: closeTime,
        },
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setRestaurantAuthState({ token: data.token });
            localStorage.setItem("token", data.token);
            postRestaurantImage({
              image: image,
              token: data.token,
            })
              .then((imageRes) => {
                if (imageRes === "success") {
                  navigate("/Restaurant/Dashboard");
                  alert("Restaurant added successfully");
                }
              })
              .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
              });
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

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="restaurant-signup">
        <Navbar />

        <div className="background-image">
          <div className="wrapper">
            <div className="welcome-text">
              <h1>We're excited to have you as a partner!</h1>
            </div>

            <div className="signup-form">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  Timings: &nbsp;
                  <input
                    type="number"
                    name="open"
                    placeholder="Open"
                    required
                    value={openTime}
                    min="0"
                    max="24"
                    style={{ maxWidth: "100px" }}
                    onChange={(e) => setOpenTime(e.target.value)}
                  />
                  &nbsp; hrs to &nbsp;
                  <input
                    type="number"
                    name="close"
                    placeholder="Close"
                    required
                    value={closeTime}
                    min="0"
                    max="24"
                    style={{ maxWidth: "100px" }}
                    onChange={(e) => setCloseTime(e.target.value)}
                  />{" "}
                  &nbsp; hrs
                </div>
                <div className="input-box">
                  <input
                    type="file"
                    id="restaurant-image"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                  />
                </div>
                <button type="submit" className="input-button">
                  Sign Up
                </button>
                <div className="text">
                  <h3>
                    Already have an account?{" "}
                    <Link to="/Restaurant/Login">Login!</Link>
                  </h3>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignup;
