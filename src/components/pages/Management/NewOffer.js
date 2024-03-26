import React, { useState, useEffect } from "react";
import "./NewOffer.css";
import { useNavigate } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementNewOffer = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const { managementAuthState } = useManagementAuthContext();

    useEffect(() => {
        if (managementAuthState.token === "") {
            navigate("/management/login");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(code, discount);

        const url = process.env.REACT_APP_BACKEND_URL + "/api/management/offer";
        console.log(url);


        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${managementAuthState.token}`,
            },
            body: JSON.stringify({
                code: code,
                discount: discount,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        alert("Offer created successfully.");
                        navigate("/management/offers");
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
    };

    return (
        <>
        <div className="management-new-offer">
        <ManagementNavbar />

        <div className="all-container">
          <div className="new-offer-form">
            <h2>Offer Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="number"
                  placeholder="Discount (%)"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="input-button">
                Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
        </>
    );
}

export default ManagementNewOffer;