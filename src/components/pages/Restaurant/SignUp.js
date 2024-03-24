import React, { useState, useEffect } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import { useRestaurantAuthContext } from '../../../hooks/useRestaurantAuthContext';

const RestaurantSignup = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tags, setTags] = useState('');
    const [timings, setTimings] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    const { setRestaurantAuthState } = useRestaurantAuthContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, name, number, address, tags, timings);

        const url = process.env.REACT_APP_BACKEND_URL + '/api/restaurant/signup';
        console.log(url);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                phone: number,
                address: address,
                email: username,
                password: password,
                tags: tags.split(','),
                timings: timings,
                image: imageSrc
            })
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                    setRestaurantAuthState({ token: data.token });
                    localStorage.setItem('token', data.token);
                    navigate('/Restaurant/Dashboard');
                });
            } else {
                response.json().then((data) => {
                    console.log(data);
                    alert(data.error);
                });
            }
        }).catch((error) => {
            console.log(error);
            alert('An error occurred. Please try again later.');
        });
    }

    return (
        <>
            <div className='restaurant-signup'>
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
                                    <input
                                        type="text"
                                        placeholder="Timings"
                                        value={timings}
                                        onChange={(e) => setTimings(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        value={timings}
                                        onChange={(e) => setImageSrc(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="input-button">Sign Up</button>
                                <div className="text">
                                    <h3>Already have an account? <Link to="/Restaurant/Login">Login!</Link></h3>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantSignup;


