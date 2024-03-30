import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import RatingModal from "../../components/RatingModal";
import RouteMap from "../../components/RouteMap";
import Loader from "../../components/Loader";
import "./OrderInfo.css";

export default () => {
  const { endpoint, authState } = useOutletContext();
  const isCustomer = endpoint === "/customer";

  const navigate = useNavigate();

  const [order, setOrder] = useState({
    restaurant: {},
    deliverer: { location: { lat: 0, lon: 0 } },
    items: [],
    customer: {},
    deliveryAddress: {},
  });
  const { id } = useParams();

  const [modal, setModal] = useState("");
  const openModal = (modalFor) => {
    setModal(modalFor);
  };
  const closeModal = () => {
    setModal("");
  };
  const modalEndpoints = {
    Restaurant: "/reviews/restaurant/" + order.restaurant.uid,
    "Delivery Agent": "/reviews/deliverer/" + order.deliverer.uid,
  };

  const [loading, setLoading] = useState(true);

  console.log(order);

  const deliverOrder = () => {
    const url = process.env.REACT_APP_API_URL + endpoint + "/order/" + id;

    setLoading(true);

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({ otp: document.getElementById("otp").value }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Order delivered successfully");
          window.location.reload();
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            setLoading(false);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("An error occurred. Please try again later.");
      });
  };

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + endpoint + `/order/${id}`;

    setLoading(true);
    let ignore = false;

    if (authState.token === "") {
      navigate(endpoint + "/login");
      return;
    }

    fetch(url, {
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => {
        if (ignore) {
          return;
        }

        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setOrder(data);
            setLoading(false);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            setLoading(false);
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);
        setLoading(false);
        alert("An error occurred. Please try again later.");
      });

    return () => {
      ignore = true;
    };
  }, [endpoint, authState.token, id]);

  if (loading && !order.uid) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mx-auto max-w-xl my-10 text-left relative">
        <img
          src={process.env.REACT_APP_BACKEND_URL + order.restaurant.image}
          alt="Restaurant Image"
          className="rounded-t-lg w-full h-40 object-cover mb-4"
        />
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 font-semibold">Restaurant:</p>
              <p>{order.restaurant.name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Delivery Agent:</p>
              <p>{order.deliverer.name}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Delivery Address:</p>
              <p>{order.deliveryAddress.text}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Order Status:</p>
              <p>{order.isCompleted ? "Delivered" : "Pending"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600 font-semibold">Item List:</p>
              <ul>
                {order.items.map((item) => (
                  <li>
                    {item.dish.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Total Price:</p>
              <p>
                <i
                  className="fa-solid fa-indian-rupee-sign"
                  style={{ fontWeight: 600 }}
                />{" "}
                {order.total}
              </p>
            </div>
            {isCustomer && !order.isCompleted ? (
              <>
                <div>
                  <p className="text-gray-600 font-semibold">OTP:</p>
                  <p>{order.otp}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">ETA:</p>
                  <p>{order.etd.split('T')[1].split('.')[0]}</p>
                </div>
              </>
            ) : (
              <></>
            )}
            <div>
              <p className="text-gray-600 font-semibold">Order Time:</p>
              <p>{order.orderTime.split('T')[1].split('.')[0]}</p>
            </div>
          </div>
          {isCustomer &&
            order.isCompleted &&
            !(order.isDelivererRated || order.isRestaurantRated) ? (
            <div className="flex justify-between mt-8">
              {!order.isRestaurantRated ? (
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  onClick={(e) => openModal("Restaurant")}
                >
                  Review Restaurant
                </button>
              ) : (
                <></>
              )}
              {!order.isDelivererRated ? (
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                  id="reviewDeliveryAgentBtn"
                  onClick={(e) => openModal("Delivery Agent")}
                >
                  Review Delivery Agent
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {endpoint === "/delivery-agent" && !order.isCompleted ? (
            <div className="flex justify-center mt-8">
              <input
                type="text"
                placeholder="Enter OTP"
                className="border-solid border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-torange"
                id="otp"
              />
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500 ml-4"
                onClick={deliverOrder}
                disabled={loading}
              >
                Complete Order
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {isCustomer && !order.isCompleted ? (
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mx-auto max-w-xl mb-10 text-left relative">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Track Order
          </h2>
          <div className="bg-gray-200 w-full mb-4 map-div">
            <RouteMap
              start={order.deliverer.location}
              destination={order.deliveryAddress}
            />
          </div>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-500" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
      ) : (
        <></>
      )}

      {isCustomer && modal ? (
        <RatingModal
          authState={authState}
          uid={order.uid}
          label={modal}
          endpoint={endpoint + modalEndpoints[modal]}
          closeModal={closeModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};
