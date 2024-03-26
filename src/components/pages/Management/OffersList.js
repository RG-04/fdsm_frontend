import React, { useState, useEffect } from "react";
import "./OffersList.css";
import { useNavigate } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementOffersList = () => {
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const { managementAuthState } = useManagementAuthContext();

    useEffect(() => {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/management/offers";

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
                        setOffers(data);
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
                alert("An error occurred. Please try again later.");
            });
    }, []);

    const handleDelete = (offer) => {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/management/offer/" + offer.code;

        fetch(url, {
            method: "DELETE",
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
                        alert("Offer deleted successfully.");
                        setOffers(offers.filter((item) => item.code !== offer.code));
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
                alert("An error occurred. Please try again later.");
            });
    }

    return (
        <>
            <div className="management-offers">
                <ManagementNavbar />

                <div className="all-container">

                    <div className="main-container">
                        {offers.length ? (<>
                        <div className="title">
                            <h1>Offers</h1>
                        </div>
                        <div className="offer-list">
                            {offers.map((offer) => (
                                <div className="offer" key={offer.code}>
                                    <div className="offer-code">Code: {offer.code}</div>
                                    <div className="offer-discount">Discount: {offer.discount} %</div>
                                    <div className="delete-box">
                                        <div className="delete-button" onClick={() => handleDelete(offer)}>
                                            <i class="fa-solid fa-trash"></i>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </>) : (<div className="title">No Offers</div>)}

                    </div>
                    <div className="button-container">
                        <div className="new-offer" onClick={() => navigate("/management/newoffer")}>
                            Add New Offer
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ManagementOffersList;