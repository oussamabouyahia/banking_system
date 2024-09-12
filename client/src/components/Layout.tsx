import { useContext } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { AlertContext } from "../Contexts/AlertContext";
import Alert from "./utils Components/Alert";
export default function Layout() {
  const { activeAlert } = useContext(AlertContext);
  return (
    <>
      <Header />
      {activeAlert.show && (
        <div className="container mx-auto p-4">
          <Alert message={activeAlert.message} color={activeAlert.color} />
        </div>
      )}
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
