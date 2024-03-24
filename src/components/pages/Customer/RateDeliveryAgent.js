import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./RateDeliveryAgent.css";

const RateDeliveryAgent = ({
  deliveryAgentInfo,
  customerAuthState,
  setRateDA,
  orderInfo,
}) => {
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitReview = () => {
    const url =
      process.env.REACT_APP_BACKEND_URL +
      "/api/customer/reviews/deliverer/" +
      deliveryAgentInfo.uid;
    const data = {
      rating: rating,
      review: comment,
      order: orderInfo.uid,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAuthState.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          alert("Review submitted successfully");
          setRateDA(false);
          window.location.reload(false);
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
  };

  return (
    <div className="rate-delivery-agent">
      <div className="rate-close">
        <button className="close-button" onClick={() => setRateDA(false)}>
          X
        </button>
      </div>
      <div className="title">
        <h1>Rate {deliveryAgentInfo.name}</h1>
      </div>
      <div className="rating-form">
        <Form.Label>Rating: {rating}</Form.Label>
        <div className="radio-range">
          <div className="radio-input">
            <input
              type="radio"
              id="rating1"
              name="rating"
              value="1"
              onChange={(e) => handleRatingChange(e)}
            />
            <label htmlFor="rating1">
              {rating >= 1 ? (
                <i className="fa-solid fa-star" style={{ color: "#ffa200" }} />
              ) : (
                <i className="fa-regular fa-star" />
              )}
            </label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              id="rating2"
              name="rating"
              value="2"
              onChange={(e) => handleRatingChange(e)}
            />
            <label htmlFor="rating2">
              {rating >= 2 ? (
                <i className="fa-solid fa-star" style={{ color: "#ffa200" }} />
              ) : (
                <i className="fa-regular fa-star" />
              )}
            </label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              id="rating3"
              name="rating"
              value="3"
              onChange={(e) => handleRatingChange(e)}
            />
            <label htmlFor="rating3">
              {rating >= 3 ? (
                <i className="fa-solid fa-star" style={{ color: "#ffa200" }} />
              ) : (
                <i className="fa-regular fa-star" />
              )}
            </label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              id="rating4"
              name="rating"
              value="4"
              onChange={(e) => handleRatingChange(e)}
            />
            <label htmlFor="rating4">
              {rating >= 4 ? (
                <i className="fa-solid fa-star" style={{ color: "#ffa200" }} />
              ) : (
                <i className="fa-regular fa-star" />
              )}
            </label>
          </div>
          <div className="radio-input">
            <input
              type="radio"
              id="rating5"
              name="rating"
              value="5"
              onChange={(e) => handleRatingChange(e)}
            />
            <label htmlFor="rating5">
              {rating >= 5 ? (
                <i className="fa-solid fa-star" style={{ color: "#ffa200" }} />
              ) : (
                <i className="fa-regular fa-star" />
              )}
            </label>
          </div>
        </div>
      </div>
      <div className="comment-form">
        <Form.Control
          as="textarea"
          placeholder="Write a comment..."
          className="comment-box"
          rows={5}
          onChange={(e) => handleCommentChange(e)}
        />
      </div>
      <div className="submit-review">
        <button onClick={submitReview}>Submit</button>
      </div>
    </div>
  );
};

export default RateDeliveryAgent;
