import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

const CustomerLogin = () => {
    return (
        <>
            <div className='customer-login'>
                <Navbar />
                <div className="background-image">
                    <div className="wrapper">
                        <div className="welcome-text">
                            <h1>Welcome dear Customer!</h1>
                        </div>
                        <div className="login-form">
                            <h2>Login</h2>
                            <form action="#">
                                <div className="input-box">
                                    <input type="text" placeholder="Enter your email" required />
                                </div>
                                <div className="input-box">
                                    <input type="password" placeholder="password" required />
                                </div>
                                <div className="input-box button">
                                    <input type="Submit" value="Login" />
                                </div>
                                <div className="text">
                                    <h3>New User? <Link to="/signup">Sign Up now!</Link></h3>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerLogin;