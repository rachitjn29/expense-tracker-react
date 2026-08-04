import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-bold">404 Error</h1>

          <h2 className="text-2xl font-semibold mt-4">Oops! Page Not Found</h2>

          <p className="text-gray-500 mt-2">
            The page you're looking for doesn't exist.
          </p>

          <Link to={"/"} className="mt-6 px-6 py-3 rounded-lg text-blue-500">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
