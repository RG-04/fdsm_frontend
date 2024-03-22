import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setManagementAuthState } = useManagementAuthContext();
  console.log("setManagementAuthState", setManagementAuthState);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    const url = process.env.REACT_APP_BACKEND_URL + "/api/management/login";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            alert("Login Successful");
            setManagementAuthState({ token: data.token });
            localStorage.setItem("token", data.token);
            navigate("/management");
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
      <div className="management-login">
        <Navbar />

        <div className="background-image">
          <div className="wrapper">
            {/* <div className="welcome-text">
              <h1>Welcome dear Management!</h1>
            </div> */}

            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
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
                  Login
                </button>
                {/* <div className="text">
                  <h3>
                    New User? <Link to="/Management/signup">Sign Up now!</Link>
                  </h3>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementLogin;
