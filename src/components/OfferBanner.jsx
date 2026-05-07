import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OfferBanner = () => {

  const navigate = useNavigate();

  return (

    <div className="mt-4 bg-green-50 rounded-3xl p-2 flex items-center justify-between shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* ICON */}
        <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
          💸
        </div>

        {/* TEXT */}
        <div>

          <h3 className="font-bold text-sm text-black">
            Flat ₹100 OFF
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            On your first order
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* COUPON */}
        <div className="border border-dashed border-green-500 bg-white px-4 py-2 rounded-xl">

          <p className="text-[11px] text-gray-500">
            Use Code:
          </p>

          <p className="text-sm font-bold text-green-700">
            WELCOME100
          </p>

        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/offer")}
          className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center"
        >

          <FaArrowRight size={14} />

        </button>

      </div>

    </div>

  );
};

export default OfferBanner;