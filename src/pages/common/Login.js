import { useMemo, useState } from "react";
import Input from "../../components/Input";
import { useNavigate, useOutletContext } from "react-router-dom";

export default () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { endpoint, setAuthState } = useOutletContext();
  const navigate = useNavigate();
  const name = useMemo(
    () =>
      endpoint
        .slice(1, endpoint.length)
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1, word.length)
        )
        .join(" "),
    [endpoint]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = process.env.REACT_APP_API_URL + endpoint + "/login";

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

      navigate(endpoint);
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white rounded p-8 shadow-md w-80 ml-1/3">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {name} Login
        </h2>
        <form onSubmit={handleSubmit}>
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
              {loading ? "Logging In...." : "Login"}
            </button>
            <p className="text-center">
              Don't have an account? &nbsp;
              <a href="#" className="text-blue-500 cursor-pointer">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
