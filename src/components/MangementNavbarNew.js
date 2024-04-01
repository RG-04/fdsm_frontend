import React from "react";
import { Link } from "react-router-dom";
import logoNav from "../assets/logo-nav.png";

const ManagementNavbarNew = ({ setAuthState, loggedIn = false }) => {
  const handleLogout = () => {
    setAuthState({ token: "" });
  };

  return (
    <>
      <nav className="bg-gray-800 py-3">
        <div className="container mx-auto px-4 w-full">
          <div className="flex justify-between items-center">
            {/* <h1 className="text-white text-lg font-semibold">ea2go</h1> */}
            <Link to="/" className="cursor-pointer"><img src={logoNav} alt="ea2go" className="h-4 text-white text-xs font-semibold" /></Link>
            <ul className="flex space-x-4 text-white">
              {loggedIn ? (
                <>
                  <li>
                    <Link
                      to="/management"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/management/profile"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/management/login"
                      className="hover:text-gray-400 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
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

export default ManagementNavbarNew;
