import React, { createContext, useState, useEffect } from 'react';

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
            {!loading ? props.children : <h1>loading</h1>}
        </RestaurantAuthContext.Provider>
    );
}