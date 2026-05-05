import BackHeader from "../components/BackHeader";
import React, { useState } from "react";
import ShopCard from "../components/ShopCard";
import { shops } from "../data/shop";

const ShopsPage = () => {
  const [search, setSearch] = useState("");

  // 🔥 SAFE LOCATION READ
  const lat = localStorage.getItem("userLat");
  const lng = localStorage.getItem("userLng");

  const userLat = lat && lat !== "null" ? Number(lat) : null;
  const userLng = lng && lng !== "null" ? Number(lng) : null;

  // 🔥 CHECK LOCATION VALID
  const noLocation =
    userLat === null ||
    userLng === null ||
    userLat === 0 ||
    userLng === 0 ||
    isNaN(userLat) ||
    isNaN(userLng);

  // 🔥 DISTANCE FUNCTION
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // 🔥 FILTER + DISTANCE + SORT
  const filteredShops = shops
    .map((shop) => {
      const matchSearch = shop.title
        .toLowerCase()
        .includes(search.toLowerCase());

      if (noLocation) {
        return { ...shop, distance: null, matchSearch };
      }

      const distance = getDistance(
        userLat,
        userLng,
        shop.lat,
        shop.lng
      );

      return {
        ...shop,
        distance: Number(distance.toFixed(1)),
        matchSearch,
      };
    })
    .filter((shop) => {
      if (noLocation) return shop.matchSearch;
      return shop.matchSearch && shop.distance < 50;
    })
    .sort((a, b) => {
      if (a.distance === null) return 0;
      return a.distance - b.distance;
    });

  return (
    <div className="p-4 pb-20">
      <BackHeader title="" />

      {/* LOGO */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-green-700">
          loocals
        </h1>
        <p className="text-sm mt-1">
          Now{" "}
          <span className="text-green-600 font-semibold">
            local shop
          </span>{" "}
          at your doorstep
        </p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search for shops in your area..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-full border mb-4 outline-none shadow-sm"
      />

      {/* FEATURES */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
        <div className="bg-white p-2 rounded shadow-sm">
          ⚡ Fast Delivery
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          ✔ Trusted Shops
        </div>
      </div>

      {/* LOCATION WARNING */}
      {noLocation && (
        <p className="text-xs text-red-500 mb-2">
          📍 Enable location for nearby shops
        </p>
      )}

      <h2 className="mb-3 font-semibold">Nearby Shops</h2>

      {/* SHOP LIST */}
      <div className="grid grid-cols-1 gap-5">
        {filteredShops.length === 0 ? (
          <p className="text-sm text-gray-500">
            No nearby shops found 😢
          </p>
        ) : (
          filteredShops.map((shop) => (
            <ShopCard
              key={shop.id}
              {...shop}
              distance={shop.distance}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default ShopsPage;