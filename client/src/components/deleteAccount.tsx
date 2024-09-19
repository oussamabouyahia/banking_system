import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    // Fetch balance and transactions data from your API
    const fetchData = async () => {
      // Mock data, replace with actual API calls
      const balanceData = 1500; // Replace with API call
      const transactionsData = [
        { date: "2024-09-01", amount: 200 },
        { date: "2024-09-05", amount: -100 },
        { date: "2024-09-10", amount: 300 },
        { date: "2024-09-15", amount: -50 },
        { date: "2024-09-20", amount: 100 },
      ]; // Replace with API call

      setBalance(balanceData);
      setTransactions(transactionsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Format transaction data for the chart
    if (transactions.length) {
      const dates = transactions.map((t) => t.date);
      const amounts = transactions.map((t) => t.amount);
      setTransactionData({
        labels: dates,
        datasets: [
          {
            label: "Transactions",
            data: amounts,
            fill: false,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.2,
          },
        ],
      });
    }
  }, [transactions]);

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-8 space-y-8">
      <div className="w-full max-w-xl p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          My Dashboard
        </h1>
        <div className="bg-blue-100 text-blue-900 text-xl font-bold p-4 rounded-lg shadow-md text-center mb-6">
          Current Balance: ${balance.toFixed(2)}
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Transaction History
          </h2>
          {transactionData.labels && (
            <Line
              data={transactionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          )}
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
          to="/transactions"
          className="block py-3 px-6 text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-md text-center"
        >
          My Transactions
        </Link>
        <Link
          to="/beneficiaries"
          className="block py-3 px-6 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md text-center"
        >
          List of Beneficiaries
        </Link>
        <Link
          to="/update-account"
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
