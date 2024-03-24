import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { useNavigate } from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import { useCustomerAuthContext } from "../../../hooks/useCustomerAuthContext";

const CustomerRestaurantList = () => {
  const navigate = useNavigate();

  const ratings = [2, 3, 3.5, 4, 4.5, 5];

  const [restaurants, setrestaurants] = useState([]);

  const { customerAuthState } = useCustomerAuthContext();

  const [filters, setFilters] = useState({
    rating: 0,
    search: "",
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const sieve = (filter) => {
    const sieve_inner = (restaurant) => {
      const filter_rating = () => {
        return restaurant.rating >= filter.rating;
      };

      const filter_search = () => {
        if (filter.search === "") {
          return true;
        }

        if (
          restaurant.name.toLowerCase().includes(filter.search.toLowerCase())
        ) {
          return true;
        }

        if (
          restaurant.tags.some((tag) =>
            tag.toLowerCase().includes(filter.search.toLowerCase())
          )
        ) {
          return true;
        }

        if (
          restaurant.menu.some((item) =>
            item.toLowerCase().includes(filter.search.toLowerCase())
          )
        ) {
          return true;
        }

        return false;
      };

      return filter_rating() && filter_search();
    };

    return sieve_inner;
  };

  useEffect(() => {
    const url = process.env.REACT_APP_BACKEND_URL + "/api/customer/restaurants";

    if (customerAuthState.token === "") {
      navigate("/customer/login");
    }

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerAuthState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setrestaurants(data);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/customer");
        alert("An error occurred. Please try again later.");
      });
  }, []);

  const handleRestaurantClick = (restaurant) => {
    navigate(`/customer/restaurant/${restaurant.uid}`);
    console.log(restaurant);
  };

  return (
    <>
      <div className="restaurant-list-page">
        <div className="background-image">
          <CustomerNavbar />

          <div className="main-container">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by restaurants, cuisines, dishes..."
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="sort-container">
              <label htmlFor="sort">Filter By:</label>
              <select
                className="sorter"
                value={filters.rating}
                name="rating"
                onChange={handleFilterChange}
              >
                <option value="0">Rating</option>
                {ratings.map((rating) => (
                  <option value={rating} key={"rating" + rating}>
                    {"Rating > " + rating}
                  </option>
                ))}
              </select>
            </div>
            <div className="restaurant-list">
              {restaurants.filter(sieve(filters)).map((restaurant) => (
                <div
                  className="restaurant"
                  key={restaurant.uid}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <div className="restaurant-img">
                    <img src={process.env.REACT_APP_BACKEND_URL + restaurant.image} alt="Restaurant Image" />
                  </div>
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>Rating: {restaurant.rating}</p>
                    <p>Tags: {restaurant.tags ? restaurant.tags.join(", ") : ""}</p>
                    <p>Timings: {String(restaurant.timings.open).padStart(2, '0')} hrs to {String(restaurant.timings.close).padStart(2, '0')} hrs </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRestaurantList;
