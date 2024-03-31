import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader";
import CustomerCard from "../../components/CustomerCard";

export default () => {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const { authState, setAuthState } = useOutletContext();
    const [loading, setLoading] = useState(true);

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
        const sieve_inner = (customer) => {

            const filter_search = () => {
                if (filter.search === "") {
                    return true;
                }

                if (
                    customer.name.toLowerCase().includes(filter.search.toLowerCase())
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
        const url = process.env.REACT_APP_API_URL + "/management/customers";
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
                        setCustomers(data);
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

    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <section>
            <div className="container mx-auto px-4 mt-4 flex justify-between">
                <div className="flex-1 mr-4 bg-white shadow-md rounded-md">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-torange-500"
                        name="search"
                        value={filters.search}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {customers.filter(sieve(filters)).map((customer) => (
                        <CustomerCard
                            uid={customer.uid}
                            data={customer}
                        />
                    ))}
                </div>
            </div>
        </section>
    )

}