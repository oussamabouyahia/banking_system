import React, { useState } from "react";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const createNewAccount = () => {
    axios
      .post("http://localhost:8001/user", { name: name, balance: amount })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
    setAmount(0);
    setName("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError("Name must be at least 3 characters long.");
    } else {
      setNameError("");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
    if (value < 10) {
      setAmountError("Deposit amount must be at least 10.");
    } else {
      setAmountError("");
    }
  };

  const isDisabled = amount < 10 || name.length < 3;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowDialog(true); // Show the confirmation dialog
  };

  const handleConfirm = () => {
    setShowDialog(false); // Hide the dialog
    createNewAccount(); // Proceed with account creation
  };

  const handleCancel = () => {
    setShowDialog(false);
    setAmount(0);
    setName(""); // Hide the dialog without creating the account
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create New Account
        </h3>

        <div className="mb-4">
          <label
            htmlFor="fname"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="fname"
            name="firstname"
            value={name}
            placeholder="Three characters required for your name"
            required
            minLength={3}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-2">{nameError}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="deposit"
            className="block text-gray-700 font-medium mb-2"
          >
            Deposit
          </label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            value={amount}
            required
            min={10}
            onChange={handleAmountChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {amountError && (
            <p className="text-red-500 text-sm mt-2">{amountError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ease-in-out ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Submit
        </button>

        {showDialog && (
          <ConfirmDialog
            title="Confirm Account Creation"
            message="Do you confirm the creation of the new account?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </form>
    </div>
  );
};

export default CreateAccount;
