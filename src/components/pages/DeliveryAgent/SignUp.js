import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { useDeliveryAgentAuthContext } from "../../../hooks/useDeliveryAgentAuthContext";

const DeliveryAgentSignUp = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setDeliveryAgentAuthState } = useDeliveryAgentAuthContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, name, number);

    const url = process.env.REACT_APP_BACKEND_URL + "/api/deliverer/signup";
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: number,
        email: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setDeliveryAgentAuthState({ token: data.token });
            localStorage.setItem("token", data.token);
            navigate("/delivery-agent");
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
      <div className="delivery-agent-signup">
        <Navbar />

        <div className="background-image">
          <div className="wrapper">
            <div className="welcome-text">
              <h1>Welcome to Ea2Go! Onboard for quick earnings!</h1>
            </div>

            <div className="signup-form">
              <h2>Sign Up</h2>
              <form onSubmit={handleSubmit}>
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
                <div className="input-box">
                  <input
                    type="text"
                    name="usr"
                    placeholder="Enter your email"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-box">
                  <input
                    type="password"
                    name="pwd"
                    placeholder="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="input-button" type="Submit">
                  Join
                </button>
                <div className="text">
                  <h3>
                    Already have an account? <Link to="/delivery-agent/login">Login!</Link>
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

export default DeliveryAgentSignUp;
