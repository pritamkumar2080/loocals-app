import React, { useMemo } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const SaleSection = () => {

  // CART
  const { addToCart } = useCart();

  // RANDOM PRODUCTS
  const saleProducts = useMemo(() => {

    return [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

  }, []);

  return (

    <div className="mt-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-4 shadow-sm overflow-hidden relative">

      {/* SALE BADGE */}
      <div className="absolute top-0 right-0 bg-yellow-300 px-3 py-1 rounded-bl-2xl">

        <p className="text-xs font-bold text-black">
          SALE
        </p>

      </div>

      {/* TITLE */}
      <div className="mb-4">

        <h2 className="text-xl font-bold text-white">
          Mega Deals 🔥
        </h2>

        <p className="text-sm text-red-100 mt-1">
          Extra 20% OFF on selected items
        </p>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-3 gap-3">

        {saleProducts.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl p-2"
          >

            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-24 object-cover rounded-xl"
            />

            {/* PRICE + ADD */}
            <div className="mt-2 flex justify-between items-center">

              <div>

                {/* DISCOUNT PRICE */}
                <p className="text-red-500 font-bold text-sm">
                  ₹{Math.floor(item.price * 0.8)}
                </p>

                {/* OLD PRICE */}
                <p className="text-[10px] text-gray-400 line-through">
                  ₹{item.price}
                </p>

              </div>

              {/* ADD BUTTON */}
              <button
                onClick={() => addToCart(item)}
                className="bg-green-600 text-white text-[10px] px-2 py-1 rounded-lg"
              >
                Add
              </button>

            </div>

            {/* NAME */}
            <p className="text-[11px] mt-2 line-clamp-1">
              {item.name}
            </p>

            {/* DISCOUNT */}
            <div className="mt-2 bg-red-100 text-red-500 text-[10px] font-bold px-2 py-1 rounded-lg text-center">

              20% EXTRA OFF

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default SaleSection;