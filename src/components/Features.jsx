import React from "react";

const Features = () => {
  return (

    <div className="grid grid-cols-4 gap-2 mt-4">

      {/* FREE DELIVERY */}
      <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col items-center text-center">

        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-1">
          <span className="text-green-600 text-sm">
            🛵
          </span>
        </div>

        <p className="text-[9px] font-semibold leading-3">
          Free Delivery
        </p>

      </div>

      {/* QUICK DELIVERY */}
      <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col items-center text-center">

        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mb-1">
          <span className="text-yellow-500 text-sm">
            ⚡
          </span>
        </div>

        <p className="text-[9px] font-semibold leading-3">
          Quick Delivery
        </p>

      </div>

      {/* BEST PRICE */}
      <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col items-center text-center">

        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-1">
          <span className="text-green-600 text-sm">
            💎
          </span>
        </div>

        <p className="text-[9px] font-semibold leading-3">
          Best Prices
        </p>

      </div>

      {/* EASY RETURN */}
      <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col items-center text-center">

        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mb-1">
          <span className="text-orange-500 text-sm">
            🔄
          </span>
        </div>

        <p className="text-[9px] font-semibold leading-3">
          Easy Returns
        </p>

      </div>

    </div>

  );
};

export default Features;