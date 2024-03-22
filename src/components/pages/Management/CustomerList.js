import React, { useState, useEffect } from "react";
import "./CustomerList.css";
import { useNavigate } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementCustomerList = () => {
    const navigate = useNavigate();

    const ratings = [2, 3, 3.5, 4, 4.5, 5];

    const [customers, setCustomers] = useState([]);

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
        const sieve_inner = (customer) => {

            const filter_search = () => {
                if (filter.search === "") {
                    return true;
                }

                if (
                    customer.name.toLowerCase().includes(filter.search.toLowerCase())
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
        const url = process.env.REACT_APP_BACKEND_URL + "/api/management/customers";

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
                        setCustomers(data);
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

    const handleCustomerClick = (customer) => {
        navigate(`/management/customer/${customer.uid}`);
        console.log(customer);
    };

    return (
        <>
            <div className="management-customer-list">
                <div className="background-image">
                    <ManagementNavbar />

                    <div className="main-container">
                        <div className="title">
                            <h1>All Customers</h1>
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

                        <div className="customer-list">
                            {customers.filter(sieve(filters)).map((customer) => (
                                <div
                                    className="customer"
                                    key={customer.uid}
                                    onClick={() => handleCustomerClick(customer)}
                                >
                                    <div className="customer-name">{customer.name}</div>
                                    <div className="customer-number">Ph: {customer.phone}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagementCustomerList;
