import React, { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router';

export const RestaurantAuthContext = createContext();

export const RestaurantAuthContextProvider = (props) => {
    const [restaurantAuthState, setRestaurantAuthState] = useState({
        token: "",
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            setRestaurantAuthState({ token });
        }
        setLoading(false);
    }
        , []);

    return (
        <RestaurantAuthContext.Provider value={{ restaurantAuthState, setRestaurantAuthState }}>
            {!loading ? (
                <Outlet />
            ) : (
                <div style={{ height: "400px", width: "400px", background: "blue" }}>
                    {" "}
                    <h1 style={{ color: "white" }}>Loading</h1>
                </div>
            )}
        </RestaurantAuthContext.Provider>
    );
}