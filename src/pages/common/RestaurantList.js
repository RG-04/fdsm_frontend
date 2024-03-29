import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import RestaurantCard from "../../components/RestaurantCard";
import Loader from "../../components/Loader";

export default ({ showRecommended = false }) => {
  const ratings = [2, 3, 3.5, 4, 4.5, 5];
  const [restaurants, setrestaurants] = useState([]);
  const { authState, endpoint } = useOutletContext();
  const [filters, setFilters] = useState({
    rating: 0,
    search: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    setLoading(true);

    let url = process.env.REACT_APP_API_URL + endpoint;
    let ignore = false;

    if (showRecommended) {
      url += "/recommendations";
    } else {
      url += "/restaurants";
    }

    fetch(url, {
      headers: {
        Authorization: "Bearer " + authState.token,
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
            setrestaurants(data);
            setLoading(false);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            setLoading(false);
          });
        }
      })
      .catch((error) => {
        if (ignore) {
          return;
        }

        console.log(error);
        navigate(endpoint);
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [authState.token, endpoint, showRecommended]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="container mx-auto px-4 mt-4 flex justify-between">
        <div className="flex-1 mr-4 bg-white shadow-md rounded-md">
          <input
            type="text"
            placeholder="Search by restaurants, cuisines, dishes..."
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>
        <div className="relative">
          <select
            className="px-4 py-2 rounded-md bg-white text-gray-800 shadow-md focus:outline-none"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="0" className="text-gray-600">
              Filter by Rating
            </option>
            {ratings.map((rating) => (
              <option
                value={rating}
                key={"rating" + rating}
                className={
                  "text-gray-800 hover:bg-torange-100" +
                  (filters.rating === rating ? " bg-torange-100" : "")
                }
              >
                {"Rating > " + rating}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container mx-auto px-4 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {restaurants.filter(sieve(filters)).map((restaurant) => (
            <RestaurantCard
              key={restaurant.uid}
              data={restaurant}
              endpoint={endpoint}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
