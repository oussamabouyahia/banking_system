import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
