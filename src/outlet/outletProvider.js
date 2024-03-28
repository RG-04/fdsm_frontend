import { useEffect, useState } from "react";

export default ({ endpoint }) => {
  const [authState, setAuthState] = useState({ token: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setAuthState({ token });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authState.token && localStorage.getItem("token") !== authState.token) {
      localStorage.setItem("token", authState.token);
    } else {
      localStorage.removeItem("token");
    }
  }, [authState.token]);

  return (
    <>
      {loading ? (
        <div style={{ height: "400px", width: "400px", background: "blue" }}>
          {" "}
          <h1 style={{ color: "white" }}>Loading</h1>
        </div>
      ) : (
        <Outlet context={{ authState, setAuthState, endpoint, setLoading }} />
      )}
    </>
  );
};
