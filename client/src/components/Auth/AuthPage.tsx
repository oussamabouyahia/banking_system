import { useState } from "react";
import axios from "axios";
import Register from "./Register";
import Login from "./Login";
import Alert from "../Utilities Components/Alert";
function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState<"red" | "green">("green");
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };
  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      if (value.length < 3) {
        setNameError("Name should be at least 3 characters");
      } else {
        setNameError("");
      }
    }

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Email should be valid");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password should be at least 6 characters");
      } else {
        setPasswordError("");
      }
    }
  };
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Email should be valid");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        setPasswordError("Password should be at least 6 characters");
      } else {
        setPasswordError("");
      }
    }
  };
  const registrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("/api/user", userRegistration)
      .then((res) => {
        setAlertMessage(res.data.message);
        setShowAlert(true);
        setIsRegister(false);
        setTimeout(() => {
          setShowAlert(false);
          setAlertColor("green");
        }, 3000);
      })
      .catch((err) => console.log(err.message));
  };
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/user/login", userLogin)
      .then((res) => {
        // localStorage.setItem("bankToken", res.data.accessToken);
        localStorage.setItem("userId", res.data.existingUser.iduser);
        setAlertMessage(res.data.message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((err) => {
        if (err.response) {
          setAlertMessage(err.response.data.errors || "An error occurred");
          setShowAlert(true);
          setAlertColor("red");
          setTimeout(() => {
            setShowAlert(false);
            setAlertColor("green");
          }, 3000);
        }
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {showAlert && <Alert message={alertMessage} color={alertColor} />}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isRegister ? "Register" : "Sign In"}
        </h2>

        {/* Register Form */}
        {isRegister && (
          <Register
            registrationSubmit={registrationSubmit}
            handleRegistrationChange={handleRegistrationChange}
            userRegistration={userRegistration}
            nameError={nameError}
            passwordError={passwordError}
            emailError={emailError}
          />
        )}

        {/* Sign In Form */}
        {!isRegister && (
          <Login
            handleLoginChange={handleLoginChange}
            userLogin={userLogin}
            loginSubmit={loginSubmit}
            emailError={emailError}
            passwordError={passwordError}
          />
        )}

        <div className="mt-6 text-center">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Register
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
