import { useState } from "react";
import Ratings from "./Ratings";

export default ({ endpoint, authState, uid, label, closeModal }) => {
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitReview = async () => {
    const url = process.env.REACT_APP_API_URL + endpoint;

    setLoading(true);

    const data = {
      rating: rating,
      review: comment,
      order: uid,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Review submitted successfully");
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Review {label}
        </h2>

        <div className="flex flex-row-reverse justify-center items-center">
          <Ratings rating={rating} setRating={setRating} name="rating-modal" />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-600 font-semibold mb-2"
            for="reviewText"
          >
            Review:
          </label>
          <textarea
            id="reviewText"
            className="w-full h-24 px-3 py-2 border-solid border-slate-500 rounded-md focus:outline-none focus:border-torange"
            value={comment}
            onChange={handleCommentChange}
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            id="closeModal"
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 mr-2"
            disabled={loading}
            onClick={closeModal}
          >
            Close
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            disabled={loading}
            onClick={submitReview}
          >
            {"Submit" + (loading ? "ting..." : "")}
          </button>
        </div>
      </div>
    </div>
  );
};
