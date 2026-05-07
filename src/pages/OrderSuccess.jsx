
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
     

      {/* ICON */}
      <div className="text-green-600 text-5xl mb-4">
        ✔
      </div>

      {/* TEXT */}
      <h2 className="text-xl font-bold mb-2">
        Order Placed Successfully 🎉
      </h2>

      <p className="text-gray-500 mb-4">
        Your order will be delivered soon
      </p>

      {/* BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Go to Home
      </button>

    </div>
  );
};

export default OrderSuccess;