import { useState } from "react";
import axios from "axios";
import Register from "./Register";
import Login from "./Login";
const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [userRegistration, setUserRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };
  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };
  const registrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userRegistration);
    axios
      .post("http://localhost:8001/user", userRegistration)
      .then((res) => {
        alert(res.data.message);
        setIsRegister(false);
      })
      .catch((err) => console.log(err.message));
  };
  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8001/user/login", userLogin)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
            handleRegistrationChange={handleRegistrationChange}
            userRegistration={userRegistration}
          />
        )}

        {/* Sign In Form */}
        {!isRegister && (
          <Login
            handleLoginChange={handleLoginChange}
            userLogin={userLogin}
            loginSubmit={loginSubmit}
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
