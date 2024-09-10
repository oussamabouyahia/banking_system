import { useState, Dispatch, SetStateAction, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Alert from "../utils Components/Alert";

import { validateInput } from "../../utils/validateInputs";
import { UserContext } from "../../Contexts/User";

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
  const navigate = useNavigate();
  const setLogged = useContext(UserContext)?.setLogged;
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleChange =
    <T extends object>(setter: Dispatch<SetStateAction<T>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setter((prev) => ({
        ...prev,
        [name]: value,
      }));

      validateInput(setNameError, setEmailError, setPasswordError, name, value);
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
      .then(async (res) => {
        setLogged(true);
        localStorage.setItem("userId", res.data.existingUser.iduser);
        localStorage.setItem("tokenDuration", res.data.tokenDuration);
        setAlertMessage(res.data.message);
        setShowAlert(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowAlert(false);
        navigate("/dashboard");
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
            handleRegistrationChange={handleChange(setUserRegistration)}
            userRegistration={userRegistration}
            nameError={nameError}
            passwordError={passwordError}
            emailError={emailError}
          />
        )}

        {/* Sign In Form */}
        {!isRegister && (
          <Login
            handleLoginChange={handleChange(setUserLogin)}
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
