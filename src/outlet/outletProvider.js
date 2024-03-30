import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";

import CustomerNavbarNew from "../components/CustomerNavbarNew";
import ManagementNavbarNew from "../components/MangementNavbarNew";
import RestaurantNavbarNew from "../components/RestaurantNavbarNew";
import DeliveryAgentNavbarNew from "../components/DeliveryAgentNavbarNew";
import { CartProvider } from "../contexts/CartContext";

export default ({ endpoint }) => {
  const [authState, setAuthState] = useState({ token: "" });
  const [fetching, setFetching] = useState(true);
  const [Navbar, setNavbar] = useState(<></>);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuthState({ token });
    }
    setFetching(false);
  }, []);

  useEffect(() => {
    console.log(authState.token, Boolean(authState.token));
    switch (endpoint.slice(1, endpoint.length)) {
      case "customer":
        setNavbar(
          <CustomerNavbarNew
            setAuthState={setAuthState}
            loggedIn={Boolean(authState.token)}
          />
        );
        break;
      case "management":
        setNavbar(
          <ManagementNavbarNew
            setAuthState={setAuthState}
            loggedIn={Boolean(authState.token)}
          />
        );
        break;
      case "restaurant":
        setNavbar(
          <RestaurantNavbarNew
            setAuthState={setAuthState}
            loggedIn={Boolean(authState.token)}
          />
        );
        break;
      case "delivery-agent":
        setNavbar(
          <DeliveryAgentNavbarNew
            setAuthState={setAuthState}
            loggedIn={Boolean(authState.token)}
          />
        );
        break;
      default:
        break;
    }
  }, [endpoint, authState.token]);

  useEffect(() => {
    console.log(authState.token);

    if (fetching) return;

    if (authState.token) {
      localStorage.setItem("token", authState.token);
    } else {
      console.log("removing token");
      localStorage.removeItem("token");
    }
  }, [authState.token]);

  return (
    <>
      {fetching ? (
        <Loader />
      ) : endpoint === "/customer" ? (
        <CartProvider>
          {Navbar}
          <Outlet
            context={{ authState, setAuthState, endpoint, setFetching }}
          />
        </CartProvider>
      ) : (
        <>
          {Navbar}
          <Outlet
            context={{ authState, setAuthState, endpoint, setFetching }}
          />
        </>
      )}
    </>
  );
};
