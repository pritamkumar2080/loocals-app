import React from "react";
import { useNavigate } from "react-router-dom";
import ShopCard from "./ShopCard";
import {
  useState,
  useEffect,
} from "react";

import {
  getFirebaseShops,
} from "../services/firebaseShopService";

const ShopsNearby = () => {

  const navigate = useNavigate();

  const [shops,
  setShops] =
  useState([]);

  useEffect(() => {

  const loadShops =
    async () => {

      const shopsData =
        await getFirebaseShops();

      setShops(
        shopsData || []
      );
    };

  loadShops();

}, []);

  const nearbyShops = shops.slice(0, 2);

  return (

    <div className="mt-3">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">

        <h2 className="text-lg font-semibold">
          Shops Near You
        </h2>

        <span
          onClick={() => navigate("/shops")}
          className="text-sm text-gray-500 cursor-pointer"
        >
          View all
        </span>

      </div>

      {/* SHOPS */}
      <div className="grid grid-cols-1 gap-3">

        {nearbyShops.map((shop) => (

          <ShopCard
            key={shop.id}
            {...shop}
          />

        ))}

      </div>

    </div>

  );
};

export default ShopsNearby;