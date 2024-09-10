import { useLoaderData } from "react-router-dom";
import { User } from "../types";
import BackToDashboardButton from "./utils Components/BackToDashboard";

const Balance = () => {
  const user = useLoaderData() as User;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <BackToDashboardButton />
      <h4 className="text-2xl mt-6 font-bold text-blue-600 mb-4 text-center">
        My Balance
      </h4>
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          Your current balance is:
          <span className="text-green-500 font-bold"> ${user.balance}</span>
        </p>
      </div>
    </div>
  );
};

export default Balance;
