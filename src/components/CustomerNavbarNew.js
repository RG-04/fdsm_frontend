import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import logoNav from "../assets/logo-nav.png";

const CustomerNavbarNew = ({ setAuthState, loggedIn = false }) => {
  const { clearCart } = useContext(CartContext);

  const handleLogout = () => {
    setAuthState({ token: "" });
    clearCart();
  };

  return (
    <>
      <nav className="bg-gray-800 py-3">
        <div className="container mx-auto px-4 w-full">
          <div className="flex justify-between items-center">
            <Link to="/" className="cursor-pointer"><img src={logoNav} alt="ea2go" className="h-4 text-white text-xs font-semibold" /></Link>
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
                      to="/customer/favourites"
                      className="hover:text-gray-400 cursor-pointer"
                    >
                      Favourites
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
                      to="/customer/orders"
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

export default CustomerNavbarNew;
