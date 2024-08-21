import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./types";
import Balance from "./components/Balance";

import axios from "axios";
import List from "./components/List";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TransfertForm from "./components/TransfertForm";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";
import UpdateAccount from "./components/update/UpdateAccount";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8001/user")
      .then((res) => setUsers(res.data.users));
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Balance users={users} />,
    },
    {
      path: "/list",
      element: <List users={users} />,
    },
    {
      path: "/transaction",
      element: <TransfertForm />,
    },
    {
      path: "/createAccount",
      element: <CreateAccount />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/update-account",
      element: <UpdateAccount />,
    },
  ]);

  return (
    <>
      <h1>Banking System</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
