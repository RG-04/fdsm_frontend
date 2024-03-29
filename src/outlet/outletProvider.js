import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";

import CustomerNavbarNew from "../components/CustomerNavbarNew";
import ManagementNavbarNew from "../components/MangementNavbarNew";
import RestaurantNavbarNew from "../components/RestaurantNavbarNew";
import DeliveryAgentNavbarNew from "../components/DeliveryAgentNavbarNew";

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
    switch (endpoint.slice(1, endpoint.length)) {
      case "customer":
        setNavbar(<CustomerNavbarNew setAuthState={setAuthState} />);
        break;
      case "management":
        setNavbar(<ManagementNavbarNew setAuthState={setAuthState} />);
        break;
      case "restaurant":
        setNavbar(<RestaurantNavbarNew setAuthState={setAuthState} />);
        break;
      case "delivery-agent":
        setNavbar(<DeliveryAgentNavbarNew setAuthState={setAuthState} />);
        break;
      default:
        break;
    }
  }, [endpoint]);

  useEffect(() => {
    console.log(authState.token);

    if (authState.token && localStorage.getItem("token") !== authState.token) {
      localStorage.setItem("token", authState.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [authState.token]);

  return (
    <>
      {fetching ? (
        <Loader />
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
