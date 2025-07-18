import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 mt-4 text-center">Loading tasks...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
