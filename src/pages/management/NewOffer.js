import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useNavigate, useOutletContext } from "react-router";
import Loader from "../../components/Loader";

export default () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { authState, setAuthState } = useOutletContext();
  const [data, setData] = useState({
    code: "",
    discount: 0,
  });

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/management/info";

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
        alert("An error occurred. Please try again later.");
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [authState.token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.discount <= 0 || data.discount > 100) {
      alert("Invalid discount value");
      return;
    }

    const url = process.env.REACT_APP_API_URL + "/management/offer";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          response.json().then((data) => {
            console.log(data);
            setLoading(false);
            setIsProcessing(false);
            alert("Offer added successfully");
            navigate("/management/offers");
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            setLoading(false);
            setIsProcessing(false);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
        setLoading(false);
        setIsProcessing(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="rounded-lg shadow-md p-8 mx-auto max-w-md mt-10 text-center">
      <form onSubmit={handleSubmit}>
        <div className="text-left space-y-1">
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Code:</span>
            <Input
              type="text"
              value={data.code}
              className="w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              disabled={false}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Discount:</span>
            <Input
              type="number"
              value={data.discount}
              className="w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, discount: e.target.value })}
              disabled={false}
            />
          </div>
        </div>
        <button
          id="editButton"
          className="mt-6 bg-transparent hover:bg-gray-200 text-gray-800 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-300 rounded-md shadow-md transition duration-300 ease-in-out"
          disabled={isProcessing}
        >
          {isProcessing ? "Adding..." : "Add Offer"}
        </button>
      </form>
    </div>
  );
};
