import { useEffect, useState } from "react";
import { User } from "./types";
import Balance from "./components/Balance";
import axios from "axios";
import List from "./components/List";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TransfertForm from "./components/TransfertForm";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";

import Header from "./components/Header";
import ErrorPage from "./components/Utilities Components/ErrorPage";
import AuthPage from "./components/Auth/AuthPage";
import Profile from "./components/update/Profile";

// Layout Component
function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("/api/user").then((res) => setUsers(res.data.users));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Wrap your components with the Layout
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <AuthPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/balance",
          element: <Balance users={users} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/list",
          element: <List users={users} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/transaction",
          element: <TransfertForm />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/createAccount",
          element: <CreateAccount />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          element: <Profile />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    // Catch-all route for undefined paths
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
