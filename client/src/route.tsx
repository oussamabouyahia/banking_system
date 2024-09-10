import { createBrowserRouter } from "react-router-dom";
import Balance from "./components/Balance";
import List from "./components/List";
import TransfertForm from "./components/TransfertForm";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorPage from "./components/utils Components/ErrorPage";
import AuthPage from "./components/Auth/AuthPage";
import Profile from "./components/update/Profile";
import ProtectedRoute from "./components/utils Components/ProtectedRoute";
import MyTransactions from "./components/MyTransactions";
import { profileLoader } from "./utils/profileLoader";
import { usersLoader } from "./utils/usersLoader";
import { transactionsLoader } from "./utils/transactionsLoader";
import Layout from "./components/Layout";

export const createRoutes = (logged: boolean) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <AuthPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/balance",
          element: (
            <ProtectedRoute authenticated={logged}>
              <Balance />
            </ProtectedRoute>
          ),
          loader: profileLoader,
          errorElement: <ErrorPage />,
        },
        {
          path: "/list",
          loader: usersLoader,
          element: (
            <ProtectedRoute authenticated={logged}>
              <List />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/transaction",
          element: (
            <ProtectedRoute authenticated={logged}>
              <TransfertForm />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/createAccount",
          element: <CreateAccount />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute authenticated={logged}>
              <Dashboard />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/profile",
          loader: profileLoader,
          element: (
            <ProtectedRoute authenticated={logged}>
              <Profile />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/myTransaction",
          loader: transactionsLoader,
          element: (
            <ProtectedRoute authenticated={logged}>
              <MyTransactions />
            </ProtectedRoute>
          ),
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
