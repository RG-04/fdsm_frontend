import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import Loader from "../../components/Loader";
import Input from "../../components/Input";

import PostDishImage from "../../helpers/PostDishImage";

const RestaurantNewItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { authState, setAuthState } = useOutletContext();

  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    let ignore = false;

    if (authState.token === "") {
      navigate("/restaurant/login");
    }

    fetch(process.env.REACT_APP_BACKEND_URL + "/api/restaurant/info", {
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
          setLoading(false);
        } else {
          let status = response.status;
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate("/restaurant/login");
            }
            navigate("/restaurant/login");
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);
        alert("An error occurred. Please try again later.");
        navigate("/restaurant/login");
      });

    return () => {
      ignore = true;
    };
  }, [authState.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, image.name, price);
    setIsProcessing(true);

    const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/menu";
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            PostDishImage({
              image: image,
              uid: data.uid,
              token: authState.token,
            })
              .then((imageRes) => {
                if (imageRes === "success") {
                  setIsProcessing(false);
                  alert("Item added successfully");
                  navigate("/restaurant/menu");
                }
              })
              .catch((error) => {
                console.log(error);
                setIsProcessing(false);
                alert("An error occurred. Please try again later.");
              });
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            setIsProcessing(false);
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsProcessing(false);
        alert("An error occurred. Please try again later.");
      });
    setIsProcessing(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage(e.target.files[0]);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-xl mt-32 text-center flex flex-col justify-evenly">
        <h2 className="text-4xl font-semibold text-gray-800">Add New Dish</h2>

        <div className="mt-8 space-y-4 w-full">
          <div className="w-full flex justify-center">
            <form
              className="w-2/3 flex flex-col justify-evenly items-center text-left"
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                placeholder="Name"
                value={name}
                className="mb-4 w-full"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Price"
                value={price}
                className="mb-4 w-full"
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                type="file"
                className="mb-4 w-full"
                onChange={handleImageChange}
              />
              <button
                type="submit"
                className="bg-tblack-500 hover:bg-tblack-700 text-white font-bold py-2 px-6 rounded"
              >
                {isProcessing ? "Adding..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantNewItem;
