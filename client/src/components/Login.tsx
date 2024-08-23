import React from "react";
interface LoginProps {
  userLogin: { email: string; password: string };
  handleLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const Login = ({ loginSubmit, handleLoginChange, userLogin }: LoginProps) => {
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

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
