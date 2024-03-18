import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';


const CustomerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        // TODO
    }

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
                                <button className="input-button" type="Submit">Login</button>
                                <div className="text">
                                    <h3>New User? <Link to="/Customer/SignUp">Sign Up now!</Link></h3>
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