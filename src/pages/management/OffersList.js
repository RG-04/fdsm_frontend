import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader";
import OfferCard from "../../components/OfferCard";

export default () => {
    const navigate = useNavigate();

    const [offers, setOffers] = useState([]);
    const { authState, setAuthState } = useOutletContext();
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false)

    const [filters, setFilters] = useState({
        search: "",
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const sieve = (filter) => {
        const sieve_inner = (offer) => {

            const filter_search = () => {
                if (filter.search === "") {
                    return true;
                }

                if (
                    offer.code.toLowerCase().includes(filter.search.toLowerCase())
                ) {
                    return true;
                }
                return false;
            };

            return filter_search();
        };

        return sieve_inner;
    };

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/management/offers";
        setLoading(true);

        if (authState.token === "") {
            navigate("/management/login");
        }

        console.log(url);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setOffers(data);
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
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                navigate("/management");
                alert("An error occurred. Please try again later.");
            });
        setLoading(false);

    }, [authState.token]);

    const handleDeleteOffer = (offer) => {
        const url = process.env.REACT_APP_API_URL + "/management/offer/" + offer.code;
        setIsProcessing(true);

        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        alert("Offer deleted successfully.");
                        setOffers(offers.filter((item) => item.code !== offer.code));
                        setIsProcessing(false);
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
                        setIsProcessing(false);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred. Please try again later.");
                setIsProcessing(false);
            });
    }

    if (loading) {
        return <Loader />
    }

    return (
        <section>
            <div className="container mx-auto px-4 mt-4 flex justify-between">
                <div className="flex-1 mr-4 bg-white shadow-md rounded-md">
                    <input
                        type="text"
                        placeholder="Search by code..."
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                    />
                </div>
                <button
                    onClick={() => navigate("/management/newoffer")}
                    className="bg-torange-500 hover:bg-torange-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
                >
                    New Offer
                </button>
            </div>

            <div className="container mx-auto px-4 my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.filter(sieve(filters)).map((offer) => (
                        <OfferCard
                            data={offer}
                            handleDeleteOffer={handleDeleteOffer}
                            isProcessing={isProcessing}
                        />
                    ))}
                </div>
            </div>
        </section>
    )

}