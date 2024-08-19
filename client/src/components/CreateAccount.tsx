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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.heading}>Create New Account</h3>

      <label htmlFor="fname" style={styles.label}>
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
        style={styles.input}
      />
      {nameError && <p style={styles.error}>{nameError}</p>}

      <label htmlFor="deposit" style={styles.label}>
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
        style={styles.input}
      />
      {amountError && <p style={styles.error}>{amountError}</p>}

      <input
        type="submit"
        value="Submit"
        disabled={isDisabled}
        style={{
          ...styles.submitButton,
          ...(isDisabled ? styles.submitButtonDisabled : {}),
        }}
      />
      {showDialog && (
        <ConfirmDialog
          title="Confirm Account Creation"
          message="Do you confirm the creation of the new account?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    width: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};

export default CreateAccount;
