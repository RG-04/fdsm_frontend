// Make authcontext bearer token
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [authState, setAuthState] = useState({
        token: "",
    });


    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            setAuthState({ token });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {props.children}
        </AuthContext.Provider>
    );
}