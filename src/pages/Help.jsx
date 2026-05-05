import BackHeader from "../components/BackHeader";
import React from "react";

const Help = () => {
  return (
    <div className="p-4 pb-20">
      <BackHeader title="Help" />

      <h2 className="text-lg font-bold mb-4">
        Help & Support
      </h2>

      {/* FAQ */}
      <div className="space-y-3">

        <div className="bg-white p-3 rounded shadow-sm">
          <p className="font-semibold text-sm">
            📦 Where is my order?
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You can track your order in the Orders section.
          </p>
        </div>

        <div className="bg-white p-3 rounded shadow-sm">
          <p className="font-semibold text-sm">
            💳 Payment failed?
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Try another payment method or check your balance.
          </p>
        </div>

        <div className="bg-white p-3 rounded shadow-sm">
          <p className="font-semibold text-sm">
            🚚 Delivery delay?
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Delivery may take longer due to high demand or weather.
          </p>
        </div>

      </div>

      {/* CONTACT */}
      <div className="mt-5 bg-green-50 p-3 rounded">

        <p className="font-semibold text-sm">
          Need more help?
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Contact us anytime
        </p>

        <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg">
          Contact Support
        </button>

      </div>

    </div>
  );
};

export default Help;