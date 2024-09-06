import { useLoaderData } from "react-router-dom";
import { TransactionType } from "../types";

const MyTransactions = () => {
  const transactions = useLoaderData() as TransactionType[];
  const userId = localStorage.getItem("userId"); // assuming userId is stored in localStorage
  console.log(transactions);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        My Transactions
      </h1>

      {/* large screens style (table)*/}
      <div className="hidden md:block">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th scope="col" className="px-4 py-2">
                Sender
              </th>
              <th scope="col" className="px-4 py-2">
                Receiver
              </th>{" "}
              <th scope="col" className="px-4 py-2">
                Amount
              </th>
              <th scope="col" className="px-4 py-2">
                date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const isReceiver = Number(userId) === transaction.receiver;
              return (
                <tr
                  key={transaction.idtransactions}
                  className={`${
                    isReceiver
                      ? "bg-green-100 border-l-4 border-green-500"
                      : "bg-red-100 border-l-4 border-red-500"
                  }`}
                >
                  <td className="px-4 py-2">{transaction.senderName}</td>
                  <td className="px-4 py-2">{transaction.receiverName}</td>
                  <td className="px-4 py-2">{transaction.amount}</td>
                  <td className="px-4 py-2">{transaction.transaction_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* cards for mobile screen */}
      <div className="md:hidden">
        {transactions.map((transaction) => {
          const isReceiver = Number(userId) === transaction.receiver;
          return (
            <div
              key={transaction.idtransactions}
              className={`p-4 mb-4 rounded-lg shadow-md ${
                isReceiver
                  ? "bg-green-100 border-l-4 border-green-500"
                  : "bg-red-100 border-l-4 border-red-500"
              }`}
            >
              <p>Sender: {transaction.senderName}</p>
              <p>Receiver: {transaction.receiverName}</p>
              <p className="text-lg font-semibold">
                Amount: {transaction.amount}
              </p>
              <p className="text-lg font-semibold">
                Date: {transaction.transaction_date}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTransactions;
