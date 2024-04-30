import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { requestOrders } from "../../helpers/RequestOrders";
import CartCard from "../../components/CartCard";

export default () => {
  const { authState, setAuthState } = useOutletContext();
  const [customerInfo, setCustomerInfo] = useState({});
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cartItems, addToCart, removeFromCart, totalPrice, removeOrder } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [address, setAddress] = useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const getQuantity = (restaurantID, itemID) => {
    const index = cartItems.findIndex(
      (cartItem) =>
        cartItem.restaurantID == restaurantID && cartItem.item.uid == itemID
    );
    if (index === -1) {
      return 0;
    }
    return cartItems[index].count;
  };

  const handleAddToCart = (restaurantID, restaurantName, item) => {
    console.log("cart", item);
    addToCart(restaurantID, restaurantName, item);
  };

  const handleRemoveFromCart = (restaurantID, restaurantName, item) => {
    console.log("cart", cartItems);
    removeFromCart(restaurantID, restaurantName, item);
  };

  const handleOfferChange = (code) => {
    setCode(code);
    offers.map((offer) => {
      if (offer.code == code) {
        setDiscount(offer.discount);
      }
    });
  };

  const handleProceed = () => {
    let isPaid = false;
    if (paymentMethod === "Card") {
      isPaid = true;
    }
    setLoading(true);
    requestOrders(
      cartItems,
      totalPrice,
      authState.token,
      address,
      discount,
      code,
      isPaid,
      removeOrder,
      navigate
    ).then(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);

    const url = process.env.REACT_APP_API_URL + "/customer/info";

    let ignore = false;

    fetch(url, {
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
          response.json().then((data) => {
            console.log(data);
            setCustomerInfo(data);
            setAddress(data.address);
            setLoading(false);
          });
        } else {
          let status = response.status;
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate("/customer/login");
            }
            setLoading(false);
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);
        navigate("/customer/login");
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });
  }, [authState.token]);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/customer/offers";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          setOffers(data);
        });
      } else {
        response.json().then((data) => {
          console.log(data);
          alert(data.error);
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log("Payment Method", paymentMethod);
  }, [paymentMethod]);

  if (cartItems.length === 0) {
    return (
      <div className="bg-twhite bg-opacity-90 py-12">
        <div className="container mx-auto px-4 w-3/4">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h3>
            <button
              onClick={() => navigate("/customer/restaurants")}
              className="bg-torange-400 hover:bg-torange-600 text-white font-semibold py-2 px-6 mx-2 my-2 rounded-lg shadow-md cursor-pointer transition duration-300"
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white bg-opacity-90 py-12">
        <div className="container mx-auto px-4 w-3/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Your Cart
          </h2>

          <div className="space-y-8">
            {cartItems.map((cartItem) => (
              <CartCard
                cartItem={cartItem}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                getQuantity={getQuantity}
              />
            ))}
          </div>

          <div className="mt-6">
            <label
              htmlFor="promo-code"
              className="block text-xl font-semibold text-gray-800 mb-2"
            >
              {offers.length ? "Promo Code:" : "No Offers available"}
            </label>
            <div className="flex gap-4">
              {offers.map((offer) => (
                <div
                  onClick={() => handleOfferChange(offer.code)}
                  className={
                    "promo-container cursor-pointer shadow-md " +
                    (code == offer.code ? "shadow-torange-200" : "")
                  }
                  key={offer.code}
                >
                  <div className="bg-white rounded-md p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {offer.discount}% off
                    </h3>
                    <p className="text-gray-600">Use code: {offer.code}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Total:</h3>
              <span className="text-2xl font-bold text-gray-800">
                Rs. {Math.floor((totalPrice * (100 - discount)) / 100)}
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment Method:
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  onChange={(e) => setPaymentMethod("Cash")}
                  type="radio"
                  id="card"
                  name="payment-method"
                  value="Cash"
                  className="checked:ring-blue-500 checked:ring-2 h-4 w-4 text-blue-600 border-gray-300 border-solid rounded-lg"
                  checked={paymentMethod === "Cash"}
                />
                <label htmlFor="Cash" className="text-gray-700">
                  Cash
                </label>
                <input
                  onChange={(e) => setPaymentMethod("Card")}
                  type="radio"
                  id="paypal"
                  name="payment-method"
                  value="Card"
                  className="checked:ring-blue-500 checked:ring-2 h-4 w-4 text-blue-600 border-gray-300 border-solid rounded-lg"
                  checked={paymentMethod === "Card"}
                />
                <label htmlFor="Card" className="text-gray-700">
                  Card
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Delivery Address:
              </h3>
              <input
                value={address}
                type="text"
                className="w-full p-2 border-solid border-2 border-gray-200 rounded-md"
                placeholder="Enter your delivery address"
                onChange={handleAddressChange}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleProceed}
                disabled={loading}
                className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                {loading ? "Processing.." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
