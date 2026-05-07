import React from "react";

const Features = () => {
  return (

    <div className="grid grid-cols-4 gap-3 mt-4">

      {/* FREE DELIVERY */}
      <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center text-center">

        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <span className="text-green-600 text-lg">
            🛵
          </span>
        </div>

        <p className="text-[11px] font-semibold">
          Free Delivery
        </p>

        
        
        

      </div>

      {/* QUICK DELIVERY */}
      <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center text-center">

        <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
          <span className="text-yellow-500 text-lg">
            ⚡
          </span>
        </div>

        <p className="text-[11px] font-semibold">
          Quick Delivery
        </p>

        
        
        

      </div>

      {/* BEST PRICE */}
      <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center text-center">

        <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mb-2">
          <span className="text-green-600 text-lg">
            💎
          </span>
        </div>

        <p className="text-[11px] font-semibold">
          Best Prices
        </p>

        
        
        

      </div>

      {/* EASY RETURN */}
      <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col items-center text-center">

        <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center mb-2">
          <span className="text-orange-500 text-lg">
            🔄
          </span>
        </div>

        <p className="text-[11px] font-semibold">
          Easy Returns
        </p>

        
        
        

      </div>

    </div>

  );
};

export default Features;