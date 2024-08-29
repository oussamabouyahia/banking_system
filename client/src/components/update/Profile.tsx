import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Utilities Components/Button";
import ConfirmDialog from "../Utilities Components/ConfirmDialog";
import Alert from "../Utilities Components/Alert";

interface AlertFormType {
  message: string;
  color: "green" | "red";
  show: boolean;
}
const id = localStorage.getItem("userId");
const Profile = () => {
  const [user, setUser] = useState({
    iduser: "",
    name: "",
    email: "",
    balance: 0,
  });
  const [alertForm, setAlertForm] = useState<AlertFormType>({
    message: "",
    color: "green",
    show: false,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [errors, setErrors] = useState({ name: "", balance: "" });
  useEffect(() => {
    axios
      .get(`/api/user/profile/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Redirect to login or handle unauthorized access
          console.log("Session expired. Please log in again.");
        } else {
          console.log(err.message);
        }
      });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
    if (name === "name") {
      if (value.length < 3) {
        setErrors((prev) => {
          return {
            ...prev,
            name: "name should no lesser than three characters",
          };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, name: "" };
        });
      }
    }

    if (name === "balance") {
      if (Number(value) < 10) {
        setErrors((prev) => {
          return {
            ...prev,
            balance: "initial balance should be greater than 10",
          };
        });
      } else {
        setErrors((prev) => {
          return { ...prev, balance: "" };
        });
      }
    }
  };
  const isDisable = user.name.length < 3 || user.balance < 10;
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
        `/api/user/${id}`,
        { name: user.name, balance: user.balance },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setShowDialog(false);
        setAlertForm((prev) => ({
          ...prev,
          message: res.data.message,

          show: true,
        }));
        setTimeout(() => {
          setAlertForm((prev) => ({
            ...prev,
            show: false,
          }));
        }, 3000);
      })
      .catch((err) => {
        setAlertForm((prev) => ({
          ...prev,
          message: err.response.data.errors || "An error occurred",
          show: true,
        }));
        setTimeout(() => {
          setAlertForm((prev) => ({
            ...prev,
            color: "green",
            show: false,
          }));
        }, 3000);
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
          {user.name} Profile
        </h3>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email:
          </label>
          <input
            defaultValue={user.email}
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
            value={user.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name} </p>
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
            value={user.balance}
            type="number"
            id="balance"
            name="balance"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.balance && (
            <p className="text-red-500 text-sm mt-2">{errors.balance} </p>
          )}
        </div>

        <Button text="update my account" isDisabled={isDisable} />
        {showDialog && (
          <ConfirmDialog
            title="Update Account"
            message="Do you confirm this modification ?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </form>
    </div>
  );
};

export default Profile;
