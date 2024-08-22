import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or an error occurred.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
