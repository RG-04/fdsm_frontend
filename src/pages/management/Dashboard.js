import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader";

const ManagementDashboard = () => {
  const { authState, setAuthState } = useOutletContext();
  const navigate = useNavigate();
  const [managementDetails, setManagementDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/management/info";

    let ignore = false;

    if (authState.token === "") {
      navigate("/management/login");
      return;
    }

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
          response.json().then((data) => {
            setManagementDetails(data);
            setLoading(false);
          });
        } else {
          let status = response.status;
          response.json().then((data) => {
            alert(data.error);
            setLoading(false);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate("/management/login");
            }
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);

        navigate("/management");
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-xl mt-32 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">
          Welcome Back, {managementDetails.name}!
        </h2>
        <p className="text-gray-600 mt-4">What would you like to do today?</p>

        <div className="mt-8 flex items-center justify-between w-full">
          <div className="w-1/2">
            <Link
              to="customers"
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-auto rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              View Customers
            </Link>
          </div>
          <div className="w-1/2">
            <Link
              to="offers"
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              View Offers
            </Link>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between w-full">
          <div className="w-1/2">
            <Link
              to="delivery-agents"
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-auto rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              View Delivery Agents
            </Link>
          </div>
          <div className="w-1/2">
            <Link
              to="restaurants"
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-auto rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              View Restaurants
            </Link>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between w-full">
          <div className="w-1/2">
            <Link
              to="balances"
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-auto rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              Balance Sheet
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementDashboard;
