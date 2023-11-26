import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h3 className="text-2xl font-semibold text-gray-600 mb-2">
        Page wasn't found
      </h3>
      <h4 className="text-lg text-gray-500 mb-8">
        Please, return:{" "}
        <Link to={`/`} className="text-blue-500 hover:underline">
          Home
        </Link>
      </h4>
    </div>
  );
}

export default ErrorPage;
