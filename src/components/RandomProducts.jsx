import React from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const RandomProducts = () => {

  const { addToCart } = useCart();

  const randomProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 20);

  return (
    <div className="mt-4 px-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">
          Popular Products
        </h2>
        <span className="text-green-600 text-xs">
          View all
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-3">
        {randomProducts.map((item) => (
          <div
            key={item.id}
            className="bg-white p-2 rounded-lg shadow-sm"
          >
            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-24 object-cover rounded"
            />

            {/* NAME */}
            <p className="text-xs mt-1">
              {item.name}
            </p>

            {/* PRICE + BUTTON */}
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm font-bold">
                ₹{item.price}
              </p>

              {/* ✅ SIMPLE ADD */}
              <button
                onClick={() => addToCart(item)}
                className="bg-green-600 text-white text-xs px-2 py-1 rounded"
              >
                Add
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RandomProducts;