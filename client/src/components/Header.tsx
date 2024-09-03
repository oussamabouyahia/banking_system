import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/User";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();
  const { logged, setLogged } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setLogged(false);
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="bg-white text-blue-600 rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg shadow-md">
            OB
          </div>
          <span className="ml-3 text-2xl font-semibold">OUSSAMA BANK</span>
        </div>

        {/* Navigation Section for Larger Screens */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to={"/"} className="text-white hover:underline">
            Home
          </Link>
          <Link to={"/dashboard"} className="text-white hover:underline">
            Dashboard
          </Link>
          <Link to={"/list"} className="text-white hover:underline">
            Beneficiaries
          </Link>
          <Link to={"/update-account"} className="text-white hover:underline">
            My Account
          </Link>
          {logged && (
            <div className="relative group">
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-500 ml-4"
              >
                {/* Logout Icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  ></path>
                </svg>
              </button>
              {/* Tooltip */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm rounded px-2 py-1">
                Logout
              </div>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white hover:text-blue-300 focus:outline-none"
            aria-label="Open Menu"
            onClick={toggleMenu}
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 py-2 px-4">
          <nav className="flex flex-col space-y-2">
            <Link
              to={"/"}
              className="text-white hover:underline"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to={"/dashboard"}
              className="text-white hover:underline"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to={"/list"}
              className="text-white hover:underline"
              onClick={toggleMenu}
            >
              Beneficiaries
            </Link>
            <Link
              to={"/update-account"}
              className="text-white hover:underline"
              onClick={toggleMenu}
            >
              My Account
            </Link>
            {logged && (
              <div className="relative group">
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-white hover:text-red-500"
                >
                  {/* Logout Icon for Mobile */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                    ></path>
                  </svg>
                </button>
                {/* Tooltip for Mobile */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm rounded px-2 py-1">
                  Logout
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
