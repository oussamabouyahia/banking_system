import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    navigate("/delete");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">My Dashboard</h1>
      <div className="w-80 flex flex-col space-y-4">
        <Link
          to="/balance"
          className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out text-center"
        >
          My Balance
        </Link>
        <Link
          to="/myTransaction"
          className="w-full bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out text-center"
        >
          My Transactions
        </Link>
        <Link
          to="/list"
          className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out text-center"
        >
          List of Beneficiaries
        </Link>
        <Link
          to="/profile"
          className="w-full bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out text-center"
        >
          Update My Account
        </Link>
        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out text-center"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
