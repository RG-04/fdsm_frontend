import React, { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router';

export const ManagementAuthContext = createContext();

export const ManagementAuthContextProvider = (props) => {
    const [managementAuthState, setManagementAuthState] = useState({
        token: "",
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            setManagementAuthState({ token });
        }
        setLoading(false);
    }
        , []);

    return (
        <ManagementAuthContext.Provider value={{ managementAuthState, setManagementAuthState }}>
            {!loading ? (
                <Outlet />
            ) : (
                <div style={{ height: "400px", width: "400px", background: "blue" }}>
                    {" "}
                    <h1 style={{ color: "white" }}>Loading</h1>
                </div>
            )}
        </ManagementAuthContext.Provider>
    );
}