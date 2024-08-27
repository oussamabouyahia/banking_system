import React from "react";
import Button from "../Utilities Components/Button";
interface LoginProps {
  userLogin: { email: string; password: string };
  handleLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailError: string;
  passwordError: string;
}
const Login = ({
  loginSubmit,
  handleLoginChange,
  userLogin,
  emailError,
  passwordError,
}: LoginProps) => {
  const isDisabled =
    emailError.length > 0 ||
    passwordError.length > 0 ||
    userLogin.password.trim().length === 0;
  return (
    <form onSubmit={loginSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your email"
          onChange={handleLoginChange}
          value={userLogin.email}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your password"
          onChange={handleLoginChange}
          value={userLogin.password}
        />
      </div>

      <Button isDisabled={isDisabled} text="Sign in" />
    </form>
  );
};

export default Login;
