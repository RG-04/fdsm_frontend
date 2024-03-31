import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useOutletContext } from "react-router";
import Loader from "../../components/Loader";

export default () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const { authState, setAuthState } = useOutletContext();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/customer/info";

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
              navigate("/customer/login");
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

    if (!edit) {
      setEdit(true);
      return;
    }

    // Save the form data
    setLoading(true);

    const url = process.env.REACT_APP_API_URL + "/customer/info";

    fetch(url, {
      method: "PUT",
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
            setEdit(false);
          });
        } else {
          response.json().then((data) => {
            console.log(data);
            alert(data.error);
            setLoading(false);
            setEdit(false);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred. Please try again later.");
        setLoading(false);
        setEdit(false);
      });
  };

  if (loading && !edit) {
    return <Loader />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-md mt-10 text-center">
      <img
        src="https://source.unsplash.com/random/200x200"
        alt="Profile Image"
        className="mx-auto rounded-full w-32 h-32 mb-4"
      />
      <form onSubmit={handleSubmit}>
        <div className="text-left space-y-1">
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Name:</span>
            <Input
              type="text"
              value={data.name}
              className="profile-name w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Email:</span>
            <Input
              type="email"
              value={data.email}
              className="profile-email w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Phone:</span>
            <Input
              type="text"
              value={data.phone}
              className="profile-phone w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              disabled={!edit}
            />
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-1/3">Address:</span>
            <Input
              type="text"
              value={data.address}
              className="profile-address w-2/3"
              showLabel={false}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              disabled={!edit}
            />
          </div>
        </div>
        <button
          id="editButton"
          className="mt-6 bg-transparent hover:bg-gray-200 text-gray-800 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-300 rounded-md shadow-md transition duration-300 ease-in-out"
          disabled={loading}
        >
          {edit ? (loading ? "Saving" : "Save") : "Edit"} Profile
        </button>
      </form>
    </div>
  );
};
