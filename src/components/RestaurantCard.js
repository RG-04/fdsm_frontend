import { Link, useOutletContext } from "react-router-dom";
import Ratings from "./Ratings";

export default ({ data, endpoint }) => {
  return (
    <Link
      to={endpoint + "/restaurant/" + data.uid}
      className="block cursor-pointer"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
        <img
          src={process.env.REACT_APP_BACKEND_URL + data.image}
          alt={data.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
          <p className="text-gray-600 mt-2">
            Rating:{" "}
            <Ratings rating={data.rating} name={data.name + "-ratings"} />
          </p>
          <p className="text-gray-600 mt-2">
            Tags: {data.tags ? data.tags.join(", ") : ""}
          </p>
          <p className="text-gray-600">
            Timings: {String(data.timings.open).padStart(2, "0")} hrs to{" "}
            {String(data.timings.close).padStart(2, "0")} hrs.
          </p>
        </div>
      </div>
    </Link>
  );
};
