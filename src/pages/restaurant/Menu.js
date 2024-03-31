import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import DishCard from "../../components/DishCard";
import Loader from "../../components/Loader";

const RestaurantMenu = () => {

    const navigate = useNavigate();

    const [restaurantInfo, setRestaurantInfo] = useState({});
    const [restaurantMenu, setRestaurantMenu] = useState([]);
    const { authState, setAuthState } = useOutletContext();

    const [loading, setLoading] = useState(true);

    const [availabilities, setAvailabilities] = useState({});
    const [isChanged, setIsChanged] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/restaurant/info";

        setLoading(true);

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
                            navigate("/restaurant/login");
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
                navigate("/restaurant/login");
                alert("An error occurred. Please try again later.");
                setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        const url =
            process.env.REACT_APP_API_URL + "/restaurant/menu";

        setLoading(true);

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
                        setRestaurantMenu(data);
                        data.map((item) => {
                            setAvailabilities((prevState) => ({ ...prevState, [item.uid]: item.isAvailable }));
                        });
                    });
                } else {
                    response.json().then((data) => {
                        console.log(data);
                        alert(data.error);
                        setLoading(false);
                    });
                    setLoading(false);
                }
            })
            .catch((error) => {
                if (ignore) {
                    return;
                }

                console.log(error);
                navigate("/restaurant/login");
                alert("An error occurred. Please try again later.");
                setLoading(false);
            });

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

    const handleToggleItem = (uid) => {
        console.log(uid);
        console.log(availabilities[uid]);
        setAvailabilities((prevState) => ({ ...prevState, [uid]: !prevState[uid] }));
        setIsChanged(true);
    }

    const handleChangesClick = () => {
        console.log(availabilities);
        for (const [uid, status] of Object.entries(availabilities)) {
            setIsProcessing(true);
            const url = process.env.REACT_APP_API_URL + "/restaurant/menu/" + uid;

            let success = true;
            console.log(status)
            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authState.token}`,
                },
                body: JSON.stringify({
                    isAvailable: status,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        console.log(response);
                        response.json().then((data) => {
                            console.log(data);
                        });
                    } else {
                        response.json().then((data) => {
                            console.log(data);
                            alert(data.error);
                            success = false;
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred. Please try again later.");
                    success = false;
                });

            if (!success) {
                setIsProcessing(false);
                break;
            }
        }

        alert("Changes saved successfully.");
        setIsChanged(false);
        setIsProcessing(false);
    }

    const RestaurantHeader = () => {
        return (
            <header className="bg-blur bg-center bg-no-repeat bg-cover py-32 relative" style={{ backgroundImage: `url('${process.env.REACT_APP_BACKEND_URL}${restaurantInfo.image}')` }}>
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
        <>
            <RestaurantHeader />

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
                            <DishCard
                                item={item}
                                showButton={false}
                                showToggle={true}
                                handleToggleItem={handleToggleItem}
                                availabilities={availabilities}
                            />
                        ))}
                    </div>

                    <div className="flex justify-evenly mt-8">
                        <button
                            disabled={isProcessing}
                            onClick={() => navigate("/restaraunt/newitem")}
                            className="bg-tblack hover:bg-tblack-200 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add New Item
                        </button>
                        {isChanged ? (<button
                            disabled={isProcessing}
                            onClick={() => handleChangesClick()}
                            className="bg-tblack hover:bg-tblack-200 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RestaurantMenu;
