// 404NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 text-white p-6 pt-36">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-8xl sm:text-9xl font-extrabold animate-bounce">
          404
        </h1>
        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-base sm:text-lg">
          The page you are looking for does not exist.
        </p>
        <p className="mt-2 text-base sm:text-lg">
          Please check the URL or return to the homepage.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-4 py-2 sm:px-6 sm:py-3 text-blue-600 bg-white rounded-lg shadow-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
      <div className="mt-10 flex justify-center md:mt-0">
        <img
          src="https://i.imgur.com/4o58I6A.png"
          alt="404 Not Found"
          className="w-48 h-48 object-contain sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
