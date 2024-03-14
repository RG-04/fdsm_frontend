import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import Navbar from '../../Navbar';

const CustomerSignup = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, name, number, address);
        // TODO
    }

    return (
        <>
            <div className='customer-signup'>
                <Navbar />

                <div className="background-image">
                    <div className="wrapper">
                        <div className="welcome-text">
                            <h1>Welcome to Ea2Go! We're glad to have you.</h1>
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
                                    <textarea
                                        name="address"
                                        placeholder="Address"
                                        required
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
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
                                <button className="input-button" type="Submit">Join</button>
                                <div className="text">
                                    <h3>Already have an account? <Link to="/Customer/Login">Login!</Link></h3>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerSignup;