import React from "react";

const UpdateLocation = ({
  authState,
  setIsClicked,
  location,
  setLocation,
  isProcessing,
  setIsProcessing,
  isWorking,
  close,
}) => {
  const handleLatitudeChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setLocation({ ...location, lat: e.target.value });
  };

  const handleLongitudeChange = (e) => {
    e.preventDefault();
    setLocation({ ...location, lon: e.target.value });
  };

  const submitLocation = (location, isNormalUpdate = true) => {
    setIsProcessing(true);
    const url = process.env.REACT_APP_API_URL + "/delivery-agent/location";

    if (
      location.lat < 8 ||
      location.lat > 38 ||
      location.lon < 68 ||
      location.lon > 99 ||
      !location.lat ||
      !location.lon
    ) {
      alert("Invalid location. Please enter a valid location.");
      setIsProcessing(false);
      return;
    }

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({ location }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          if (isNormalUpdate) {
            alert("Location updated successfully");
            setIsClicked(false);
            setIsProcessing(false);
            window.location.reload();
          }
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            if (isNormalUpdate) {
              setIsProcessing(false);
            } else {
              window.location.reload();
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
        if (isNormalUpdate) {
          setIsProcessing(false);
        } else {
          window.location.reload();
        }
      });
  };

  const enableTracking = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        const loc = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(loc);
        submitLocation(loc, false);
      },
      (error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
        window.location.reload();
      },
      { timeout: 5000 }
    );

    close();
  };

  const useCurrentLocation = () => {
    setIsProcessing(true);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      const loc = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      setLocation(loc);
      submitLocation(loc);
    });
  };

  return (
    <>
      <div className="flex justify-center mt-8 w-full">
        <input
          type="number"
          placeholder="Enter Latitude"
          value={location.lat}
          onChange={handleLatitudeChange}
          className="border-solid border-gray-300 rounded-md w-1/4 px-4 py-2 mx-4 focus:outline-none focus:border-torange"
        />
        <input
          type="number"
          placeholder="Enter Longitude"
          value={location.lon}
          onChange={handleLongitudeChange}
          className="border-solid border-gray-300 rounded-md w-1/4 px-4 py-2 mx-4 focus:outline-none focus:border-torange"
        />
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 ml-4 disabled:bg-gray-300"
          onClick={useCurrentLocation}
          disabled={isProcessing}
        >
          Use current location
        </button>
      </div>
      <div className="flex justify-center mt-4 w-full">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 ml-4 disabled:bg-gray-300"
          onClick={() => submitLocation(location)}
          disabled={isProcessing}
        >
          {"Submit" + (isProcessing ? "ting" : "")}
        </button>
        {isWorking ? (
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 ml-4"
            onClick={enableTracking}
          >
            Enable Tracking
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UpdateLocation;
