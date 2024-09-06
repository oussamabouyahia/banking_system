import { useLoaderData } from "react-router-dom";
import { TransactionType } from "../types";

const MyTransactions = () => {
  const transactions = useLoaderData() as TransactionType[];
  const userId = localStorage.getItem("userId");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        My Transactions
      </h1>

      {/* large screens style (table)*/}
      <div className="hidden md:block">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-6 py-4 text-gray-600">Sender</th>
              <th className="px-6 py-4 text-gray-600">Receiver</th>
              <th className="px-6 py-4 text-gray-600">Amount</th>
              <th className="px-6 py-4 text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const isReceiver = Number(userId) === transaction.receiver;
              return (
                <tr
                  key={transaction.idtransactions}
                  className={`transition duration-300 ease-in-out ${
                    isReceiver
                      ? "bg-green-50 hover:bg-green-200 border-l-4 border-green-500"
                      : "bg-red-50 hover:bg-red-200 border-l-4 border-red-500"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-700">
                    {transaction.senderName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {transaction.receiverName}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(
                      transaction.transaction_date
                    ).toLocaleDateString()}{" "}
                    {new Date(transaction.transaction_date).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* cards for mobile screen */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => {
          const isReceiver = Number(userId) === transaction.receiver;
          return (
            <div
              key={transaction.idtransactions}
              className={`p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                isReceiver
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-red-50 border-l-4 border-red-500"
              }`}
            >
              <p className="text-gray-700">
                <strong>Sender:</strong> {transaction.senderName}
              </p>
              <p className="text-gray-700">
                <strong>Receiver:</strong> {transaction.receiverName}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong>Amount:</strong> {transaction.amount}
              </p>
              <p className="text-gray-500">
                <strong>Date:</strong>{" "}
                {new Date(transaction.transaction_date).toLocaleDateString()}{" "}
                {new Date(transaction.transaction_date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTransactions;
