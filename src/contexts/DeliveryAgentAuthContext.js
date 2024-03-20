import React, { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router';

export const DeliveryAgentAuthContext = createContext();

export const DeliveryAgentAuthContextProvider = (props) => {
    const [deliveryAgentAuthState, setDeliveryAgentAuthState] = useState({
        token: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            setDeliveryAgentAuthState({ token });
        }
        setLoading(false);
    }
    , []);

    return (
        <DeliveryAgentAuthContext.Provider
            value={{ deliveryAgentAuthState, setDeliveryAgentAuthState }}
        >
            {!loading ? (
                <Outlet />
            ) : (
                <div style={{ height: "400px", width: "400px", background: "blue" }}>
                    {" "}
                    <h1 style={{ color: "white" }}>Loading</h1>
                </div>
            )}
        </DeliveryAgentAuthContext.Provider>
    );
}
