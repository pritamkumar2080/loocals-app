import React from "react";
import { useNavigate } from "react-router-dom";
import ShopCard from "./ShopCard";
import { shops } from "../data/shops";

const ShopsNearby = () => {
  const navigate = useNavigate();

  const nearbyShops = shops.slice(0, 2); // 👈 only 3

  return (
    <div className="px-4 mt-4">
      <div className="flex justify-between mb-3">
        <h2>Shops Near You</h2>

        <span onClick={() => navigate("/shops")}>
          View all
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {nearbyShops.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </div>
    </div>
  );
};

export default ShopsNearby;