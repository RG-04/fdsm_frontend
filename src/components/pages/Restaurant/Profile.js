import React, { useState, useEffect } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import RestaurantNavbar from "./RestaurantNavbar";
import { useRestaurantAuthContext } from "../../../hooks/useRestaurantAuthContext";
import postRestaurantImage from "../../../helpers/postRestaurantImage";

const RestaurantProfile = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [tags, setTags] = useState();
  const [openTime, setOpenTime] = useState(0);
  const [closeTime, setCloseTime] = useState(0);
  const [imageSrc, setImageSrc] = useState("");
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { restaurantAuthState } = useRestaurantAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/info";

    if (restaurantAuthState.token === "") {
      navigate("/restaurant/login");
      return;
    }
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${restaurantAuthState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setName(data.name);
            setNumber(data.phone);
            setAddress(data.address);
            setUsername(data.email);
            data.tags ? setTags(data.tags.join(",")) : setTags("");
            setOpenTime(data.timings.open);
            setCloseTime(data.timings.close);
            setImageSrc(data.image);
            setReviews(data.reviews);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/restaurant/login");
        alert("An error occurred. Please try again later.");
      });
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_BACKEND_URL + "/api/restaurant/info";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${restaurantAuthState.token}`,
      },
      body: JSON.stringify({
        name: name,
        phone: number,
        address: address,
        tags: tags.split(","),
        timings: { open: openTime, close: closeTime },
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            alert("Details Updated Successfully");
            setIsEditing(false);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
      });

    if (image) {
      postRestaurantImage({
        image: image,
        token: restaurantAuthState.token,
      })
        .then((imageRes) => {
          if (imageRes === "success") {
            alert("Image Uploaded Successfully");
          }
        })
        .catch((error) => {
          console.log(error);
          alert(
            "An error occurred while uploading image. Please try again later."
          );
        });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="restaurant-profile">
        <div className="all-container">
          <RestaurantNavbar />

          <div className="main-container">
            <div className="title">Restaurant Info</div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="detail">
                  <div className="detail-title">Name:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-title">Phone Number:</div>
                  <div className="input-box">
                    <input
                      type="phone"
                      name="phone"
                      placeholder="Phone Number"
                      required
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-title">Email:</div>
                  <div className="detail-value">{username}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Address:</div>
                  <div className="input-box">
                    <textarea
                      name="address"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-title">Tags:</div>
                  <div className="input-box">
                    <input
                      type="text"
                      name="tags"
                      placeholder="Tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-title">Timings:</div>
                  <div className="input-box timings">
                    <input
                      type="number"
                      name="open"
                      placeholder="Open"
                      required
                      value={openTime}
                      min="0"
                      max="24"
                      onChange={(e) => setOpenTime(e.target.value)}
                    />
                    <input
                      type="number"
                      name="close"
                      placeholder="Close"
                      required
                      value={closeTime}
                      min="0"
                      max="24"
                      onChange={(e) => setCloseTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="detail">
                  <div className="detail-title">Image:</div>
                  <div className="input-box">
                    <input
                      type="file"
                      name="image"
                      placeholder="Image"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="save-button">
                  <button className="input-button" type="Submit">
                    Save Details
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail">
                  <div className="detail-title">Name:</div>
                  <div className="detail-value">{name}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Phone Number:</div>
                  <div className="detail-value">{number}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Email:</div>
                  <div className="detail-value">{username}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Address:</div>
                  <div className="detail-value">{address}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Tags:</div>
                  <div className="detail-value">{tags}</div>
                </div>
                <div className="detail">
                  <div className="detail-title">Timings:</div>
                  <div className="detail-value">
                    {String(openTime).padStart(2, "0")} hrs to{" "}
                    {String(closeTime).padStart(2, "0")} hrs{" "}
                  </div>
                </div>
                <div className="image">
                  <img
                    src={process.env.REACT_APP_BACKEND_URL + imageSrc}
                    alt="Restaurant"
                  />
                </div>

                <div className="edit-button">
                  <button
                    className="input-button"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            )}
          </div>
          {reviews.length ? (
            <div className="main-container reviews">
              <div className="title">
                <h1>Reviews</h1>
              </div>
              <div className="review-list">
                {reviews.map((review) => (
                  <div className="review">
                    <div className="review-rating">
                      {"⭐".repeat(review.rating)}
                    </div>
                    <div className="review-name">{review.poster.name}</div>
                    <div className="review-comment">{review.comment}</div>
                  </div>
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

export default RestaurantProfile;
