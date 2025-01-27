import React from "react";

import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="text-xl text-gray-700 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
