import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Coupon = () => {

  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");

  const handleApplyCoupon = () => {

    if (coupon === "SAVE20") {

      localStorage.setItem(
        "couponCode",
        coupon
      );

      navigate("/cart");

    } else {

      alert("Invalid Coupon Code");

    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">

      {/* TOP */}
      <div className="flex items-center gap-3 mb-6">

        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/cart")}
        />

        <h1 className="text-xl font-bold">
          Apply Coupon
        </h1>

      </div>

      {/* CARD */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">

        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="w-full border p-4 rounded-xl outline-none"
        />

        <button
          onClick={handleApplyCoupon}
          className="w-full mt-4 bg-green-600 text-white py-4 rounded-2xl font-semibold"
        >
          Apply Coupon
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Use code:
          <span className="font-bold text-green-600">
            {" "}SAVE20
          </span>
        </p>

      </div>

    </div>
  );
};

export default Coupon;