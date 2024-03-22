import React, { useState, useEffect, useContext } from "react";
import "./ViewRestaurant.css";
import { useNavigate, useParams } from "react-router-dom";
import ManagementNavbar from "./ManagementNavbar";
import { ManagementAuthContext } from "../../../contexts/ManagementAuthContext";

const ManagementViewRestaurant = () => {

  const navigate = useNavigate();

  let { restaurantID } = useParams();

  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});

  const { managementAuthState } = useContext(ManagementAuthContext);

  useEffect(() => {
    const url =
      process.env.REACT_APP_BACKEND_URL +
      "/api/management/restaurant/" +
      restaurantID;

    if (managementAuthState.token === "") {
      navigate("/management/login");
    }

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
            setRestaurantMenu(data.menu);
            setRestaurantInfo(data);
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
        navigate("/management/login");
        alert("An error occurred. Please try again later.");
      });
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

        if (
          item.name.toLowerCase().includes(filter.search.toLowerCase())
        ) {
          return true;
        }

        return false;
      };

      return filter_price() && filter_search();
    };

    return sieve_inner;
  };

  return (
    <>
      <div className="management-view-restaurant">
        {/* <div className="background-image">
                    <img src={restaurantInfo.imageSrc} alt="Restaurant Image" />
                </div> */}
        {/* TODO */}

        <div className="all-container">
          <ManagementNavbar />

          <div className="main-container">
            <div className="restaurant-name">
              <h1>{restaurantInfo.name}</h1>
            </div>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search for dishes..."
                name="search"
                onChange={handleFilterChange}
              />
            </div>

            <div className="sort-container">
              <label htmlFor="sort">Filter By:</label>
              <select
                className="sorter"
                value={filters.price}
                name="price"
                onChange={handleFilterChange}
              >
                <option value="1000000">Price</option>
                {prices.map((price) => (
                  <option value={price}>{"< " + price}</option>
                ))}
              </select>
            </div>

            <div className="item-list">
              {restaurantMenu.filter(sieve(filters)).map((item) => (
                <div className="item" key={item.uid}>
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">Rs. {item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementViewRestaurant;