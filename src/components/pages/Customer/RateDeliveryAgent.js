import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./RateDeliveryAgent.css";


const RateDeliveryAgent = ({ deliveryAgentInfo, customerAuthState, setRateDA, orderInfo }) => {
    const [rating, setRating] = useState(2);
    const [comment, setComment] = useState("");

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const submitReview = () => {
        const url = process.env.REACT_APP_BACKEND_URL + "/api/customer/reviews/deliverer/" + deliveryAgentInfo.uid;
        const data = {
            rating: rating,
            review: comment,
            order: orderInfo.uid
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${customerAuthState.token}`,
            },
            body: JSON.stringify(data)
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
    }

    return (
        <div className="rate-delivery-agent">
            <div className="rate-close">
                <button className="close-button" onClick={() => setRateDA(false)}>X</button>
            </div>
            <div className="title">
                <h1>Rate {deliveryAgentInfo.name}</h1>
            </div>
            <div className="rating-form">
                <Form.Label>
                    Rating: {rating}
                </Form.Label>
                <Form.Range
                    value={rating}
                    onChange={(e) => handleRatingChange(e)}
                    className="custom-slider"
                    min="1"
                    max="5" />

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
}

export default RateDeliveryAgent;