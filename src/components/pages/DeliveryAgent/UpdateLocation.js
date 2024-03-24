import React, { useState } from 'react';
import "./UpdateLocation.css";


const UpdateLocation = ({ deliveryAgentAuthState, setIsClicked, location, setLocation }) => {

    const handleLatitudeChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setLocation({ ...location, lat: e.target.value });
    }

    const handleLongitudeChange = (e) => {
        e.preventDefault();
        setLocation({ ...location, lon: e.target.value });
    }

    const submitLocation = () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/deliverer/location';

        if(location.lat < 8 || location.lat > 38 || location.lon < 68 || location.lon > 99 || !location.lat || !location.lon) {
            alert('Invalid location. Please enter a valid location.');
            return;
        }

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
            },
            body: JSON.stringify(location),
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    alert('Location updated successfully');
                    setIsClicked(false);
                    window.location.reload();
                } else {
                    response.json().then((data) => {
                        console.log(data);
                        alert(data.error);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                alert('An error occurred. Please try again later.');
            });
    }

    return (
        <div className="update-location">
            <div className="location-close">
                <button className="close-button" onClick={() => setIsClicked(false)}>X</button>
            </div>
            <div className="title">
                <h1>Update Location</h1>
            </div>
            <div className="location-form">
                <div className="form-group">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" value={location.lat} id="latitude" placeholder="Enter Latitude" onChange={handleLatitudeChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" value={location.lon} id="longitude" placeholder="Enter Longitude" onChange={handleLongitudeChange} />
                </div>
            </div>
            <div className="submit-location">
                <button onClick={submitLocation}>Submit</button>
            </div>
        </div>
    );
}

export default UpdateLocation;