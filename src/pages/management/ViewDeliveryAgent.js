import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useNavigate, useOutletContext, useParams } from "react-router";
import Loader from "../../components/Loader";
import Ratings from "../../components/Ratings";

export default () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const { authState, setAuthState } = useOutletContext();
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        reviews: [],
    });

    const id = useParams().id;

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "/management/deliverer/" + id;

        let ignore = false;

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
                        setData(data);
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
                alert("An error occurred. Please try again later.");
                setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [authState.token]);

    const handlePaymentCollected = () => {
        setIsProcessing(true);

        const url = process.env.REACT_APP_API_URL + "/management/markpaid/deliverer/" + id;

        fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    alert("Payment collected successfully.");
                    setData({ ...data, pendingMoney: 0 });
                    setIsProcessing(false);
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
            });
        setIsProcessing(false);
    }


    if (loading) {
        return <Loader />;
    }

    return (
        <div className="px-4">
            <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-md mt-10 mb-8 text-center">
                <img
                    src="https://source.unsplash.com/random/200x200"
                    alt="Profile Image"
                    className="mx-auto rounded-full w-32 h-32 mb-4"
                />
                <form onSubmit={() => { }}>
                    <div className="text-left space-y-1">
                        <div className="flex items-center">
                            <span className="font-semibold w-1/3">Name:</span>
                            <Input
                                type="text"
                                value={data.name}
                                className="profile-name w-2/3"
                                showLabel={false}
                                disabled={true}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold w-1/3">Email:</span>
                            <Input
                                type="email"
                                value={data.email}
                                className="profile-email w-2/3"
                                showLabel={false}
                                disabled={true}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold w-1/3">Phone:</span>
                            <Input
                                type="text"
                                value={data.phone}
                                className="profile-phone w-2/3"
                                showLabel={false}
                                disabled={true}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold w-1/3">Pending Money: </span>
                            <Input
                                type="text"
                                value={"Rs. " + data.pendingMoney}
                                className="profile-money w-2/3"
                                showLabel={false}
                                disabled={true}
                            />
                        </div>
                        <div className="flex items-center">
                            <span className="font-semibold w-1/3">Rating: </span>
                            <Ratings rating={data.rating} />
                        </div>
                    </div>
                </form>
                <div className="flex justify-evenly">
                    <button
                        className="mt-6 bg-torange-500 hover:bg-torange-700 text-white font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-md transition duration-300 ease-in-out"
                        disabled={loading || isProcessing}
                        onClick={() => navigate("/management/delivery-agent/" + id + "/orders")}
                    >
                        Show Orders
                    </button>
                    {data.pendingMoney ? (<button
                        className="mt-6 bg-torange-500 hover:bg-torange-700 text-white font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-md transition duration-300 ease-in-out"
                        disabled={loading || isProcessing}
                        onClick={handlePaymentCollected}
                    >
                        Clear Payments
                    </button>) : (<></>)}
                </div>
            </div>

            {data.reviews.length ? (
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

                    {data.reviews.map((review) => (
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
    );
};
