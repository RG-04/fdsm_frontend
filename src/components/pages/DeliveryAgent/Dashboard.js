import React, { useState, useEffect } from "react";
import './Dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import DeliveryAgentNavbar from "./DeliveryAgentNavbar";
import UpdateLocation from "./UpdateLocation";
import { useDeliveryAgentAuthContext } from "../../../hooks/useDeliveryAgentAuthContext";

const DeliveryAgentDashboard = () => {

    const { deliveryAgentAuthState } = useDeliveryAgentAuthContext();
    const [deliveryAgentInfo, setDeliveryAgentInfo] = useState({});
    const [workingStatus, setWorkingStatus] = useState(false);
    const [location, setLocation] = useState({ lat: 0, lon: 0});
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/deliverer/info';

        if (deliveryAgentAuthState.token === "") {
            navigate('/delivery-agent/login');
            return;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
            },
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                    setDeliveryAgentInfo(data);
                    setWorkingStatus(data.workingStatus);
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
    }, []);

    const handleUpdateLocation = () => {
        setIsClicked(true);
    }

    const handleStopWorking = () => {
        const url = process.env.REACT_APP_BACKEND_URL + '/api/deliverer/working';

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${deliveryAgentAuthState.token}`,
            },
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                alert('Status updated successfully');
                setWorkingStatus(0);
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
            <div className="delivery-agent-dashboard">

                <div className="background-image">

                    <DeliveryAgentNavbar />

                    <div className="main-container">
                        <div className="left-side">
                            <div className="left-div">
                                <button className="dashboard-button" onClick={() => navigate("/delivery-agent/orders")}>Orders</button>
                                <button className="dashboard-button" onClick={handleUpdateLocation}>Update Location</button>
                                {workingStatus === 1 ? <button className="dashboard-button" onClick={handleStopWorking}>Stop Working</button> : <></>}
                            </div>
                        </div>


                        <div className="content-side">
                            <div className="content">
                                <h1>Welcome Back</h1>
                            </div>
                        </div>
                    </div>

                    {isClicked ? <div className="location-container">
                        <UpdateLocation deliveryAgentAuthState={deliveryAgentAuthState} setIsClicked={setIsClicked} location={location} setLocation={setLocation} />
                    </div> : <></>}
                </div>

            </div>
        </>
    )
}

export default DeliveryAgentDashboard;