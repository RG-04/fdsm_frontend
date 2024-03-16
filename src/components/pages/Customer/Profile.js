import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';


const CustomerSignup = () => {

    const details = { name: "Dummy", number: "1234567890", address: "Dummy Address", username: "abc@gmail.com", password: "123456" };
    //TODO get details from backend

    const [name, setName] = useState(details.name);
    const [number, setNumber] = useState(details.number);
    const [address, setAddress] = useState(details.address);
    const [username, setUsername] = useState(details.username);

    console.log(name, number, address, username);

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, number, address);
        setIsEditing(false);
        // TODO
    }

    return (
        <>
            <div className='customer-profile'>

                <div className="all-container">

                    <CustomerNavbar />
                    
                    <div className="main-container">
                        <div className="title">My Profile</div>
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
                                <div className="save-button">
                                    <button className="input-button" type="Submit">Save Details</button>
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
                                
                                <div className="edit-button">
                                    <button className="input-button" onClick={() => {console.log("click"); setIsEditing(true);}}>Edit Details</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerSignup;