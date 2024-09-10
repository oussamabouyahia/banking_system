import { useContext, useEffect } from "react";

import { UserContext } from "./Contexts/User";
import { createRoutes } from "./route";
import { RouterProvider } from "react-router-dom";
function App() {
  const { logged, setLogged } = useContext(UserContext);
  useEffect(() => {
    if (logged) {
      const tokenDuration = localStorage.getItem("tokenDuration");
      const timeout = setTimeout(() => {
        setLogged(false);
        localStorage.removeItem("userId");
      }, Number(tokenDuration));

      // Cleanup on component unmount or when logged changes
      return () => clearTimeout(timeout);
    }
  }, [logged, setLogged]);
  const router = createRoutes(logged);
  return <RouterProvider router={router} />;
}

export default App;
