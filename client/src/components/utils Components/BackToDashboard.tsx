import { useNavigate } from "react-router-dom";

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out"
    >
      Back to Dashboard
    </button>
  );
};

export default BackToDashboardButton;
