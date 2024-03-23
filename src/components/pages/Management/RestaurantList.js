import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { useNavigate } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { useManagementAuthContext } from "../../../hooks/useManagementAuthContext";

const ManagementRestaurantList = () => {
  const navigate = useNavigate();

  const ratings = [2, 3, 3.5, 4, 4.5, 5];

  const [restaurants, setRestaurants] = useState([]);

  const { managementAuthState } = useManagementAuthContext();

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
    const url = process.env.REACT_APP_BACKEND_URL + "/api/management/restaurants";

    if (managementAuthState.token === "") {
      navigate("/management/login");
    }

    console.log(url);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${managementAuthState.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setRestaurants(data);
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
        navigate("/management");
        alert("An error occurred. Please try again later.");
      });
  }, []);

  const handleRestaurantClick = (restaurant) => {
    navigate(`/management/restaurant/${restaurant.uid}`);
    console.log(restaurant);
  };

  return (
    <>
      <div className="management-restaurant-list">
        <div className="background-image">
          <ManagementNavbar />

          <div className="main-container">
            <div className="title">
              <h1>All Restaurants</h1>
            </div>
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
                    <img src={restaurant.image} alt="Restaurant Image" />
                  </div>
                  <div className="restaurant-info">
                    <h3>{restaurant.name}</h3>
                    <p>Rating: {restaurant.rating}</p>
                    <p>Cuisine: {restaurant.cuisine}</p>
                    <p>Timings: {restaurant.timings}</p>
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

export default ManagementRestaurantList;
