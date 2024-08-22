import { useState } from "react";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isRegister ? "Register" : "Sign In"}
        </h2>

        {/* Register Form */}
        {isRegister && (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>
        )}

        {/* Sign In Form */}
        {!isRegister && (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Register
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
