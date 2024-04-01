import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import OrderCard from "../../components/OrderCard";
import Loader from "../../components/Loader";

export default ({ userType = "" }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const { authState, endpoint, setAuthState } = useOutletContext();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    let ignore = false;
    let url = process.env.REACT_APP_API_URL + endpoint + "/orders";

    if (endpoint === "/management")
      url =
        process.env.REACT_APP_API_URL + endpoint + `/orders/${userType}/${id}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => {
        if (ignore) {
          return;
        }

        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setOrders(data);
            setPendingOrders(
              data.filter((order) => order.isCompleted === false)
            );
            setDeliveredOrders(
              data.filter((order) => order.isCompleted === true)
            );
            setLoading(false);
          });
        } else {
          let status = response.status;
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate(endpoint + "/login");
            }
            setLoading(false);
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);
        navigate(endpoint + "/login");
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [authState.token]);

  if (loading) {
    return <Loader />;
  }

  if (!orders.length) {
    return (
      <div className="bg-opacity-90 py-12">
        <div className="container mx-auto px-4 w-3/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            No Orders
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-fscr bg-white bg-opacity-80 py-12">
        <div className="container mx-auto px-4 w-3/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Orders</h2>

          {pendingOrders.length ? (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Pending Orders
              </h3>
              <div className="space-y-8">
                {pendingOrders.map((order) => (
                  <OrderCard order={order} key={order.uid} />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}

          {deliveredOrders.length ? (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Delivered Orders
              </h3>
              <div className="space-y-8">
                {deliveredOrders.map((order) => (
                  <OrderCard order={order} />
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
