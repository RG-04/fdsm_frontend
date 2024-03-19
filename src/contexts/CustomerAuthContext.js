// Make authcontext bearer token
import React, { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "./CartContext";

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
    <CartProvider>
      <CustomerAuthContext.Provider
        value={{ customerAuthState, setCustomerAuthState }}
      >
        {!loading ? (
          <Outlet />
        ) : (
          <div style={{ height: "400px", width: "400px", background: "blue" }}>
            {" "}
            <h1 style={{ color: "white" }}>Loading</h1>
          </div>
        )}
      </CustomerAuthContext.Provider>
    </CartProvider>

  );
};
