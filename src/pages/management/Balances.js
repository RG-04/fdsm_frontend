import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const Balances = () => {
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(true);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const url = process.env.REACT_APP_API_URL + "/management/balances";

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    response.json().then((data) => {
                        console.log(data);
                        setBalances(data);
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
        return <Loader />;
    }

    return (
        <div className="py-10">
            <div className="text-center bg-white bg-opacity-100 w-3/4 mx-auto min-h-full rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800">Balances</h1>
                <div className="mt-4">
                    <table className="w-full mx-auto">
                        <thead>
                            <tr>
                                <th className="font-bold">Month</th>
                                <th className="font-bold">Accounted Payment</th>
                                <th className="font-bold">Pending Payment</th>
                                <th className="font-bold">Pending Dues</th>
                                <th className="font-bold">Net Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balances.map((balance) => (
                                <tr key={balance.year * 100 + balance.month}>
                                    <td className="py-2">{monthNames[balance.month] + " " + balance.year}</td>
                                    <td className="py-2">Rs. {balance.inHand}</td>
                                    <td className="py-2">Rs. {balance.toCollect}</td>
                                    <td className="text-red-500 py-2">Rs. {balance.toGive}</td>
                                    <td className="text-green-500 py-2">Rs. {balance.inHand + balance.toCollect - balance.toGive}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Balances;