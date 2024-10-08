import { useState, Dispatch, SetStateAction, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { validateInput } from "../../utils/validateInputs";
import { UserContext } from "../../Contexts/User";
import { AlertContext } from "../../Contexts/AlertContext";

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
  const navigate = useNavigate();
  const setLogged = useContext(UserContext)?.setLogged;
  const { setActiveAlert } = useContext(AlertContext);
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
        setActiveAlert((prev) => ({
          ...prev,
          message: res.data.message,
          color: "green",
          show: true,
        }));

        setIsRegister(false);
      })
      .catch((err) => {
        if (err.response)
          setActiveAlert((prev) => ({
            ...prev,
            message: err.response.data.message,
            color: "red",
            show: true,
          }));
      });
  };
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/user/login", userLogin)
      .then((res) => {
        setLogged(true);
        localStorage.setItem("userId", res.data.existingUser.iduser);
        localStorage.setItem("tokenDuration", res.data.tokenDuration);

        setActiveAlert((prev) => ({
          ...prev,
          show: true,
          message: res.data.message,
          color: "green",
        }));

        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          setActiveAlert((prev) => ({
            ...prev,
            show: true,
            message: err.response.data.message,
            color: "red",
          }));
          setUserLogin({ email: "", password: "" });
        }
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
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
