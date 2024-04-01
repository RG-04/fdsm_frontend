import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="bg-white py-8 px-12 rounded-lg shadow-md space-y-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-tblack">
          Welcome to <span className="text-tyellow">eat</span>
          <span className="text-torange">2</span>
          <span className="text-tyellow">Go</span>
        </h1>
        <div className="flex flex-col gap-6">
          <Link
            to="/customer/login"
            className="block py-4 px-4 bg-torange-400 text-white text-center rounded-md shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            I'm a Customer
          </Link>
          <Link
            to="/delivery-agent/login"
            className="block py-4 px-4 bg-torange-400 text-white text-center rounded-md shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            I'm a Delivery Agent
          </Link>
          <Link
            to="/restaurant/login"
            className="block py-4 px-4 bg-torange-400 text-white text-center rounded-md shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
          >
            I'm a Restaurant
          </Link>
        </div>
      </div>
    </div>
  );
};
