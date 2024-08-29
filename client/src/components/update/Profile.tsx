import { useState, useEffect } from "react";
import axios from "axios";
const id = localStorage.getItem("userId");
const Profile = () => {
  const [user, setUser] = useState({
    iduser: "",
    name: "",
    email: "",
    balance: 0,
  });
  useEffect(() => {
    axios
      .get(`/api/user/profile/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Redirect to login or handle unauthorized access
          console.log("Session expired. Please log in again.");
        } else {
          console.log(err.message);
        }
      });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          {user.name} Profile
        </h3>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            defaultValue={user.email}
            type="text"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            value={user.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="balance"
            className="block text-gray-700 font-medium mb-2"
          >
            Balance:
          </label>
          <input
            value={user.balance}
            type="number"
            id="balance"
            name="balance"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Update My Account
        </button>
      </form>
    </div>
  );
};

export default Profile;
