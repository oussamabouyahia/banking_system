import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      // the promise below is just to simulate a real request
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios.delete(`/api/user/${userId}`, {
        data: { password },
        withCredentials: true,
      });

      // On success, navigate to home or login page
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error: any) {
      setError(
        error.response.message || "failed to delete , check your password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Delete Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter your password to confirm:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your password"
          />
        </div>

        <button
          onClick={handleDeleteAccount}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } transition-colors duration-300 ease-in-out`}
        >
          {isLoading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
