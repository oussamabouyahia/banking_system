import { useContext, useEffect, useState } from "react";
import { User } from "./types";
import Balance from "./components/Balance";
import axios from "axios";
import List from "./components/List";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import TransfertForm from "./components/TransfertForm";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";
import { UserContext } from "./Contexts/User";
import Header from "./components/Header";
import ErrorPage from "./components/utils Components/ErrorPage";
import AuthPage from "./components/Auth/AuthPage";
import Profile from "./components/update/Profile";
import { profileLoader } from "./utils/profileLoader";

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
    axios
      .get("/api/user", {
        withCredentials: true,
      })
      .then((res) => setUsers(res.data.users));
  }, []);
  const userContext = useContext(UserContext);
  const logged = userContext?.logged;
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
          element: logged ? <Balance /> : <AuthPage />,
          loader: profileLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "/list",
          element: logged ? <List users={users} /> : <AuthPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/transaction",
          element: logged ? <TransfertForm /> : <AuthPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/createAccount",
          element: <CreateAccount />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard",
          element: logged ? <Dashboard /> : <AuthPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          loader: profileLoader,
          element: logged ? <Profile /> : <AuthPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
