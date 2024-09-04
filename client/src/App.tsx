import { useContext, useEffect } from "react";
import Balance from "./components/Balance";
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
import ProtectedRoute from "./components/utils Components/ProtectedRoute";
import { usersLoader } from "./utils/usersLoader";

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
  const { logged, setLogged } = useContext(UserContext);
  useEffect(() => {
    if (logged) {
      console.log(logged);
      const tokenDuration = localStorage.getItem("tokenDuration");
      const timeout = setTimeout(() => {
        setLogged(false);
        localStorage.removeItem("userId");
      }, Number(tokenDuration));

      // Cleanup on component unmount or when logged changes
      return () => clearTimeout(timeout);
    }
  }, [logged, setLogged]);

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
