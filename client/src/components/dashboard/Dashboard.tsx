import { Link, useLoaderData } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TransactionType, User } from "../../types";
import axios from "axios";

const Dashboard = () => {
  const { profileData, transactionsData } = useLoaderData() as {
    profileData: User;
    transactionsData: TransactionType[];
  };

  const user = profileData;
  const transactions = transactionsData;

  const data = transactions.map((transaction) => {
    if (transaction.receiverName === user.name)
      return {
        name: "received",
        date: transaction.transaction_date,
        received: transaction.amount,
        transfered: 0,
      };
    else
      return {
        name: "transfered",
        date: transaction.transaction_date,
        received: 0,
        transfered: transaction.amount,
      };
  });
  const maxAmount = Math.max(
    ...transactions.map((transaction) => Number(transaction.amount))
  );
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-8 space-y-8">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          My Dashboard
        </h1>
        <div className="bg-blue-100 text-blue-900 text-xl font-bold p-4 rounded-lg shadow-md text-center mb-6">
          Current Balance: ${user?.balance}
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Transaction History
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, maxAmount + 50]} />

                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="transfered" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl space-y-4">
        <Link
          to="/balance"
          className="block py-3 px-6 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md text-center"
        >
          My Balance
        </Link>
        <Link
          to="/myTransaction"
          className="block py-3 px-6 text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-md text-center"
        >
          My Transactions
        </Link>
        <Link
          to="/list"
          className="block py-3 px-6 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md text-center"
        >
          List of Beneficiaries
        </Link>
        <Link
          to="/profile"
          className="block py-3 px-6 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-md text-center"
        >
          Update My Account
        </Link>
        <Link
          to="/delete"
          className="block py-3 px-6 text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-md text-center"
        >
          Delete My Account
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
