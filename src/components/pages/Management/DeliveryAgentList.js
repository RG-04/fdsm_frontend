import React, { useState, useEffect } from "react";
import "./DeliveryAgentList.css";
import { useNavigate } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementDeliveryAgentList = () => {
    const navigate = useNavigate();

    const ratings = [2, 3, 3.5, 4, 4.5, 5];

    const [deliveryAgents, setDeliveryAgents] = useState([]);

    const { managementAuthState } = useManagementAuthContext();

    const [filters, setFilters] = useState({
        search: "",
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const sieve = (filter) => {
        const sieve_inner = (deliveryAgent) => {

            const filter_search = () => {
                if (filter.search === "") {
                    return true;
                }

                if (
                    deliveryAgent.name.toLowerCase().includes(filter.search.toLowerCase())
                ) {
                    return true;
                }
                return false;
            };

            return filter_search();
        };

        return sieve_inner;
    };

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/management/deliverers";

        if (managementAuthState.token === "") {
            navigate("/management/login");
        }

        console.log(url);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${managementAuthState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setDeliveryAgents(data);
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
                navigate("/management");
                alert("An error occurred. Please try again later.");
            });
    }, []);

    const handleDeliveryAgentClick = (deliveryAgent) => {
        navigate(`/management/delivery-agent/${deliveryAgent.uid}`);
        console.log(deliveryAgent);
    };

    return (
        <>
            <div className="management-delivery-agent-list">
                <div className="background-image">
                    <ManagementNavbar />

                    <div className="main-container">
                        <div className="title">
                            <h1>All Delivery Agents</h1>
                        </div>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="delivery-agent-list">
                            {deliveryAgents.filter(sieve(filters)).map((deliveryAgent) => (
                                <div
                                    className="delivery-agent"
                                    key={deliveryAgent.uid}
                                    onClick={() => handleDeliveryAgentClick(deliveryAgent)}
                                >
                                    <div className="delivery-agent-name">{deliveryAgent.name}</div>
                                    <div className="delivery-agent-number">Ph: {deliveryAgent.phone}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagementDeliveryAgentList;
