import React from "react";
import { Link } from "react-router-dom";

const CustomerNavbarNew = ({ setAuthState, loggedIn = false }) => {
  const handleLogout = () => {
    setAuthState({ token: "" });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalPrice");
  };

  return (
    <>
      <nav className="bg-gray-800 py-3">
        <div className="container mx-auto px-4 w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-lg font-semibold">ea2go</h1>
            <ul className="flex space-x-4 text-white">
              {loggedIn ? (
                <>
                  <li>
                    <Link
                      to="/customer"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer/cart"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="customer/orders"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer/profile"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer/login"
                      className="hover:text-gray-400 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/home"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer/login"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customer/signup"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default CustomerNavbarNew;
