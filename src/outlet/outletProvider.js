import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Outlet } from "react-router-dom";

export default ({ endpoint }) => {
  const [authState, setAuthState] = useState({ token: "" });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuthState({ token });
    }
    setFetching(false);
  }, []);

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
        <Outlet context={{ authState, setAuthState, endpoint, setFetching }} />
      )}
    </>
  );
};
