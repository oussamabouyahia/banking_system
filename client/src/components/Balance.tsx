import { useState } from "react";
import { User } from "../types";

interface BalanceProps {
  users: User[];
}

const Balance: React.FC<BalanceProps> = ({ users }) => {
  const [balance, setBalance] = useState(false);
  const [name, setName] = useState("");

  const getBalance = () => {
    setBalance(true);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">
        Check Balance
      </h4>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select User
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        >
          <option value="" disabled selected>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.iduser} value={user?.name}>
              {user?.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        onClick={getBalance}
      >
        Get Balance
      </button>

      <p className="mt-4 text-gray-700">
        The balance of
        <span className="font-medium text-gray-800"> {name} </span> is:
        <span className="font-semibold text-gray-900">
          {balance
            ? ` ${users.find((user) => user.name === name)?.balance}`
            : " "}
        </span>
      </p>
    </div>
  );
};

export default Balance;
