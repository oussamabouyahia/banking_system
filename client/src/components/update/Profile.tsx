import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Button from "../utils Components/Button";
import ConfirmDialog from "../utils Components/ConfirmDialog";
import Alert from "../utils Components/Alert";
import axios from "axios";
import { User } from "../../types";

import { AlertFormType } from "../../types";

const Profile = () => {
  const user = useLoaderData() as User; // Fetch user data from loader
  const [formData, setFormData] = useState<User>(user);

  const [alertForm, setAlertForm] = useState<AlertFormType>({
    message: "",
    color: "green",
    show: false,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [errors, setErrors] = useState<{ name: string; balance: string }>({
    name: "",
    balance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "name should no lesser than three characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }

    if (name === "balance" && Number(value) < 10) {
      setErrors((prev) => ({
        ...prev,
        balance: "initial balance should be greater than 10",
      }));
    } else {
      setErrors((prev) => ({ ...prev, balance: "" }));
    }
  };

  const isDisable = formData.name.length < 3 || formData.balance < 10;

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleConfirm = () => {
    axios
      .put(
        `/api/user/${user.iduser}`,
        { name: formData.name, balance: formData.balance },
        { withCredentials: true }
      )
      .then((res) => {
        setShowDialog(false);
        setAlertForm({ message: res.data.message, color: "green", show: true });
        setTimeout(
          () => setAlertForm({ message: "", color: "green", show: false }),
          3000
        );
      })
      .catch((err) => {
        setAlertForm({
          message: err.response.data.errors || "An error occurred",
          color: "red",
          show: true,
        });
        setTimeout(
          () => setAlertForm({ message: "", color: "green", show: false }),
          3000
        );
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleUpdate}
      >
        {alertForm.show && (
          <Alert message={alertForm.message} color={alertForm.color} />
        )}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          {formData.name} Profile
        </h3>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            defaultValue={formData.email}
            type="text"
            id="email"
            name="email"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name:
          </label>
          <input
            value={formData.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="balance"
            className="block text-gray-700 font-medium mb-2"
          >
            Balance:
          </label>
          <input
            value={formData.balance}
            onChange={handleChange}
            type="number"
            id="balance"
            name="balance"
            placeholder="Enter your initial balance"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.balance && (
            <p className="text-red-500 text-sm mt-2">{errors.balance}</p>
          )}
        </div>

        <Button text="Update My Account" isDisabled={isDisable} />
        {showDialog && (
          <ConfirmDialog
            title="Update Account"
            message="Do you confirm this modification?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </form>
    </div>
  );
};

export default Profile;
