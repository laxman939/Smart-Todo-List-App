import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-danger-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-danger-700 mb-2">
          Error Loading Tasks
        </h3>
        <p className="text-danger-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
