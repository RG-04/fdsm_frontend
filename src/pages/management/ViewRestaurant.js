import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import Ratings from "../../components/Ratings";
import Loader from "../../components/Loader";
import DishCard from "../../components/DishCard";

const ManagementViewRestaurant = () => {
  const navigate = useNavigate();

  let { restaurantID } = useParams();

  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({
    reviews: [],
    timings: {},
  });
  const { authState, setAuthState } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setLoading(true);

    const url =
      process.env.REACT_APP_API_URL + "/management/restaurant/" + restaurantID;

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
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setRestaurantMenu(data.menu);
            setRestaurantInfo(data);
            setLoading(false);
          });
        } else {
          let status = response.status;
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate("/management/login");
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
        navigate("/management/login");
        alert("An error occurred. Please try again later.");
      });

    setLoading(false);

    return () => {
      ignore = true;
    };
  }, []);

  const prices = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  const [filters, setFilters] = useState({
    price: 1000000,
    search: "",
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    console.log(e);
  };

  const sieve = (filter) => {
    const sieve_inner = (item) => {
      const filter_price = () => {
        return item.price <= filter.price;
      };

      const filter_search = () => {
        if (filter.search === "") {
          return true;
        }

        if (item.name.toLowerCase().includes(filter.search.toLowerCase())) {
          return true;
        }

        return false;
      };

      return filter_price() && filter_search();
    };

    return sieve_inner;
  };

  const handleDuePayment = () => {
    setIsProcessing(true);

    const url = process.env.REACT_APP_API_URL + "/management/markpaid/restaurant/" + restaurantID;

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          alert("Payment successful");
          setIsProcessing(false);
          window.location.reload();
        } else {
          let status = response.status;
          response.json().then((data) => {
            console.log(data);
            if (status === 801 || status === 800) {
              setAuthState({ token: "" });
              navigate("/management/login");
            }
            alert(data.error);
            setIsProcessing(false);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
        setIsProcessing(false);
      });
  };

  const RestaurantHeader = () => {
    return (
      <header
        className="bg-blur bg-center bg-no-repeat bg-cover py-32 relative"
        style={{
          backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}${restaurantInfo.image}')`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <h2 className="text-4xl font-bold text-white mb-4">
              {restaurantInfo.name}
            </h2>
          </div>
        </div>
      </header>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="min-h-fscr bg-white bg-opacity-80">
      <RestaurantHeader />

      <div className="mt-8 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <i className="fas fa-map-marker-alt text-xl mr-4 text-gray-700"></i>
              <p className="text-lg text-gray-800">{restaurantInfo.address}</p>
            </div>

            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <i className="fas fa-phone-alt text-xl mr-4 text-gray-700"></i>
              <p className="text-lg text-gray-800">{restaurantInfo.phone}</p>
            </div>

            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <i className="fas fa-envelope text-xl mr-4 text-gray-700"></i>
              <p className="text-lg text-gray-800">{restaurantInfo.email}</p>
            </div>

            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <i className="fas fa-tags text-xl mr-4 text-gray-700"></i>
              <p className="text-lg text-gray-800t">
                {restaurantInfo.tags ? restaurantInfo.tags.join(", ") : ""}
              </p>
            </div>

            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <i className="fas fa-clock text-xl mr-4 text-gray-700"></i>
              <p className="text-lg text-gray-800">
                {String(restaurantInfo.timings.open).padStart(2, "0")} hrs to{" "}
                {String(restaurantInfo.timings.close).padStart(2, "0")} hrs{" "}
              </p>
            </div>

            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <Ratings rating={restaurantInfo.rating} />
            </div>

            <div className="flex items-center border-b-1 border-t-0 border-r-0 border-l-0 border-solid border-gray-300 pb-6 pt-6">
              <i class="fa-solid fa-money-bill text-xl mr-4 text-gray-700"></i>
              <p className="text-lg text-gray-800t">
                Due: Rs. {restaurantInfo.pendingMoney ? restaurantInfo.pendingMoney : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full flex justify-center">
        <button
          onClick={() =>
            navigate("/management/restaurant/" + restaurantID + "/orders")
          }
          disabled={isProcessing}
          className="bg-torange-500 hover:bg-torange-600 text-white font-semibold py-2 px-12 rounded-md shadow-md transition duration-300"
        >
          View Restaurant Orders
        </button>
        {restaurantInfo.pendingMoney ? (
          <button
            onClick={handleDuePayment}
            disabled={isProcessing}
            className="bg-torange-500 hover:bg-torange-600 text-white font-semibold py-2 px-12 rounded-md shadow-md transition duration-300 ml-4"
          >
            Pay Due Amount
          </button>
        ) : (
          <></>
        )
        }
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10 w-1/2 mx-auto">
            <div className="w-full max-w-md bg-white shadow-md rounded-md mr-2">
              <input
                type="text"
                placeholder="Search dishes..."
                name="search"
                onChange={handleFilterChange}
                className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500"
              />
            </div>

            <select
              className="px-4 py-2 rounded-md bg-white text-gray-800 shadow-md focus:outline-none"
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
            >
              <option value="100000" className="text-gray-600">
                Filter by Price
              </option>
              {prices.map((price) => (
                <option
                  value={price}
                  key={"price" + price}
                  className={
                    "text-gray-800 hover:bg-torange-100" +
                    (filters.price === price ? " bg-torange-100" : "")
                  }
                >
                  {"Price < " + price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {restaurantMenu.filter(sieve(filters)).map((item) => (
              <DishCard item={item} showButton={false} />
            ))}
          </div>

          {restaurantInfo.reviews.length ? (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

              {restaurantInfo.reviews.map((review) => (
                <div className="bg-white rounded-md shadow-md p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">
                      {review.poster.name}
                    </h3>
                    <div className="flex space-x-2">
                      <Ratings rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManagementViewRestaurant;
