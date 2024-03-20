import React, { useEffect } from "react";
import './Dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import DeliveryAgentNavbar from "./DeliveryAgentNavbar";
import { useDeliveryAgentAuthContext } from "../../../hooks/useDeliveryAgentAuthContext";

const DeliveryAgentDashboard = () => {

    const { deliveryAgentAuthState } = useDeliveryAgentAuthContext();
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

    return (
        <>
            <div className="delivery-agent-dashboard">

                <div className="background-image">

                    <DeliveryAgentNavbar />

                    <div className="main-container">
                        <div className="left-side">
                            <div className="left-div">
                                <Link to="/delivery-agent/orders"><button className="dashboard-button">Orders</button></Link>
                                <Link to="/delivery-agent/update-location"><button className="dashboard-button">Update Location</button></Link>
                            </div>
                        </div>


                        <div className="content-side">
                            <div className="content">
                                <h1>Welcome Back</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DeliveryAgentDashboard;