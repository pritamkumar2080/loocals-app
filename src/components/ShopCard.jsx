import React from "react";
import { useNavigate } from "react-router-dom";

const ShopCard = ({ id, title, offer, rating, time, img, distance }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/shop/${id}`)}
      className="flex w-full gap-2 bg-white rounded-xl shadow-sm p-2 cursor-pointer overflow-hidden"
    >

      {/* LEFT IMAGE */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* MIDDLE */}
      <div className="flex-1 min-w-0">

        <h3 className="text-xs font-semibold leading-tight truncate">
          {title}
        </h3>

        <p className="text-[10px] text-gray-500 truncate">
          Grocery, Fruits & Vegetables
        </p>

        <p className="text-[10px] text-gray-500 mt-1">
          ⭐ {rating}
        </p>

        <p className="text-[10px] text-green-600">
          ⏱ {time}
        </p>

        {/* 🔥 FIXED DISTANCE */}
        {distance !== null && distance !== undefined && (
          <p className="text-[10px] text-blue-600">
            📍 {distance} km away
          </p>
        )}

      </div>

      {/* RIGHT */}
      <div className="text-right text-[10px] flex flex-col items-end flex-shrink-0">

        <p className="bg-green-100 px-2 py-1 rounded whitespace-nowrap">
          Free
        </p>

        <p className="mt-1 whitespace-nowrap">₹199</p>

      </div>

    </div>
  );
};

export default ShopCard;