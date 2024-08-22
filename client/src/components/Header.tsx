import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <nav className="hidden md:flex space-x-4">
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
