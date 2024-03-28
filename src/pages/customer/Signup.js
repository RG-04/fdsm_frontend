import { useState } from "react";
import Input from "../../components/Input";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

export default () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useOutletContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_API_URL + "/customer/signup";

    try {
      setLoading(true);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { token } = await response.json();
      setAuthState({ token });
      console.log("success");

      navigate("/customer");
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white rounded p-8 shadow-md w-96 my-5 lg:ml-1/3">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Customer Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            id="name"
            className="mb-4"
            required={true}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            id="email"
            className="mb-4"
            required={true}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            name="address"
            label="Address"
            type="text"
            placeholder="Enter your address"
            id="address"
            className="mb-4"
            required={true}
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
          <Input
            name="phone"
            label="Phone Number"
            type="text"
            placeholder="Enter your phone number"
            id="phone"
            className="mb-4"
            required={true}
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            id="password"
            className="mb-4"
            required={true}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              className="text-center bg-tblack-400 text-white px-4 py-2 rounded hover:bg-tblack-700 focus:outline-none focus:bg-tblack-700 disabled:bg-tblack-200"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="text-sm text-center">
              {" "}
              Already have an account? &nbsp;
              <Link
                to={"/customer/login"}
                className="text-blue-500 cursor-pointer"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
