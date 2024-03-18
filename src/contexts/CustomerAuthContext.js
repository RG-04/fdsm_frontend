// Make authcontext bearer token
import React, { createContext, useState, useEffect } from 'react';

export const CustomerAuthContext = createContext();

export const CustomerAuthContextProvider = (props) => {
    const [customerAuthState, setCustomerAuthState] = useState({
        token: "",
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            setCustomerAuthState({ token });
        }
        setLoading(false);
    }, []);

    return (
        <CustomerAuthContext.Provider value={{ customerAuthState, setCustomerAuthState }}>
            {!loading ? props.children : <h1>loading</h1>}
        </CustomerAuthContext.Provider>
    );
}