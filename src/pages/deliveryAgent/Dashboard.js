import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader";
import UpdateLocation from "../../components/UpdateLocation";

const DeliveryAgentDashboard = () => {
  const { authState, setAuthState } = useOutletContext();
  const navigate = useNavigate();
  const [deliveryAgentDetails, setDeliveryAgentDetails] = useState({});
  const [workingStatus, setWorkingStatus] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/delivery-agent/info";

    let ignore = false;

    if (authState.token === "") {
      navigate("/delivery-agent/login");
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
            setDeliveryAgentDetails(data);
            setWorkingStatus(data.workingStatus);
            setLoading(false);
          });
        } else {
          let status = response.status;
          response.json().then((data) => {
            alert(data.error);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate("/delivery-agent/login");
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

        navigate("/delivery-agent");
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [authState.token]);

  const handleUpdateLocationClick = () => {
    setIsClicked(!isClicked);
  };

  const handleStopWorking = () => {
    const url = process.env.REACT_APP_API_URL + "/delivery-agent/working";
    setIsProcessing(true);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("Status updated successfully");
        // setWorkingStatus(0);
        setIsProcessing(false);
        window.location.reload();
      } else {
        response.json().then((data) => {
          alert(data.error);
          setIsProcessing(false);
        });
      }
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 mx-auto max-w-xl mt-32 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">
          Welcome Back, {deliveryAgentDetails.name}!
        </h2>
        <p className="text-gray-600 mt-4">What would you like to do today?</p>

        <div className="mt-8 space-y-4">
          <button
            disabled={isProcessing}
            onClick={handleUpdateLocationClick}
            className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300"
          >
            {isClicked ? "Cancel" : "Update Location"}
          </button>
          <button
            disabled={isProcessing}
            onClick={() => navigate("/delivery-agent/orders")}
            className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300"
          >
            My Orders
          </button>
          {workingStatus === 1 ? (
            <button
              onClick={handleStopWorking}
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              Stop Working
            </button>
          ) : (
            <></>
          )}
        </div>
        {isClicked ? (
          <UpdateLocation
            authState={authState}
            location={location}
            setLocation={setLocation}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            close={() => setIsClicked(false)}
            isWorking={workingStatus !== 0}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default DeliveryAgentDashboard;
