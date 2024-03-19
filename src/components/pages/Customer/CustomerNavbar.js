import React, { useState, useContext } from "react";
import "./CustomerNavbar.css";
import { Link } from "react-router-dom";
import { useCustomerAuthContext } from "../../../hooks/useCustomerAuthContext";
import { useNavigate } from "react-router-dom";

const CustomerNavbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { setCustomerAuthState } = useCustomerAuthContext();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    setCustomerAuthState({ token: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
    navigate("/home");
  };

  return (
    <>
      <div className="nav-bar-customer">
        <div className="navbar-logo">
          <img
            className="logo"
            src={require("../../../imgs/logo.png")}
            alt="Ea2Go Logo"
          />
        </div>
        <div
          className={`menu-button ${menuVisible ? "change" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div
          className={`menu-container ${menuVisible ? "active" : ""}`}
          id="menuContainer"
        >
          <Link to="/customer" className="menu-links">
            Dashboard
          </Link>
          <Link to="cart" className="menu-links">
            Cart
          </Link>
          <Link to="orders" className="menu-links">
            My Orders
          </Link>
          <Link to="profile" className="menu-links">
            Profile
          </Link>
          <Link to="/home" className="menu-links" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CustomerNavbar;
