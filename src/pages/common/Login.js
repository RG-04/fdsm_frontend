export default ({ endpoint }) => {
  return (
    <section className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white rounded p-8 shadow-md w-80 ml-1/3">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input mt-1 block w-full border-b-2 border-0 border-solid border-gray-300 px-2 py-1 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input mt-1 block w-full border-b-2 border-0 border-solid border-gray-300 px-2 py-1 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              className="text-center bg-tblack text-white px-4 py-2 rounded hover:bg-tblack-700 focus:outline-none focus:bg-tblack-700"
            >
              Login
            </button>
            <p className="text-center">
              Don't have an account? &nbsp;
              <a href="#" className="text-blue-500">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
