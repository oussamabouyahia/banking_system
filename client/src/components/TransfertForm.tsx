import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "./utils Components/ConfirmDialog";
import Alert from "./utils Components/Alert";
import { AlertFormType } from "../types";
const TransfertForm = () => {
  const [amount, setAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertFormType>({
    show: false,
    message: "",
    color: "green",
  });
  const location = useLocation();
  const navigate = useNavigate();

  const transaction = () => {
    const id = location.state.id;
    const senderId = localStorage.getItem("userId");

    axios
      .post(`api/user/transfert/${id}`, {
        amount: amount,
        senderId: senderId,
      })
      .then((res) => {
        setShowAlert({ message: res.data.message, color: "green", show: true });
        setTimeout(() => {
          setShowAlert({ message: "", color: "green", show: false });
          navigate("/list");
        }, 3000);
      })
      .catch((err) => {
        setShowAlert({
          message: err.response.data.errors || "error occurred",
          color: "red",
          show: true,
        });
        setTimeout(
          () => setShowAlert({ message: "", color: "green", show: false }),
          3000
        );
      });
  };

  const handleTransaction = () => {
    transaction();
    setAmount(0);
    setShowDialog(false);
  };

  const cancelTransaction = () => {
    setAmount(0);
    setShowDialog(false);
    navigate("/list");
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-lg w-full flex flex-col p-8 rounded-lg shadow-lg">
        {showAlert && (
          <Alert message={showAlert.message} color={showAlert.color} />
        )}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Transfer Money to{" "}
          <span className="text-3xl font-bold underline text-green-400 ">
            {location.state.name}
          </span>
        </h1>
        <form className="space-y-4 flex flex-col">
          <div className="flex flex-col items-start">
            <label
              className="block text-left text-gray-700 font-medium mb-2"
              htmlFor="amount"
            >
              Amount:
            </label>
            <input
              id="amount"
              value={amount}
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
          </div>

          <div className="text-center flex flex-wrap sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
            <button
              type="button"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={() => setShowDialog(true)}
            >
              Confirm Transfer
            </button>
            <button
              onClick={() => navigate("/list")}
              className="w-full bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>

          {showDialog && (
            <ConfirmDialog
              title="Transaction"
              message="Do you confirm this transaction?"
              onCancel={cancelTransaction}
              onConfirm={handleTransaction}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default TransfertForm;
