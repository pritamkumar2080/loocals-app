import BackHeader from "../components/BackHeader";
import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { shops } from "../data/shop";
import { useCart } from "../context/CartContext";

const ShopDetail = () => {
  const { id } = useParams();
  const shopId = Number(id);

  const { addToCart } = useCart();

  const shop = shops.find(
    (s) => Number(s.id) === shopId
  );

  const shopProducts = products.filter(
    (p) => Number(p.shopId) === shopId
  );

  if (!shop) return <p className="p-4">Shop not found</p>;

  return (
    <div className="p-4">
      <BackHeader title="" />

      {/* SHOP IMAGE */}
      <img
        src={shop.img}
        alt={shop.title}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />

      {/* SHOP TITLE */}
      <h2 className="text-lg font-bold">
        {shop.title}
      </h2>

      {/* INFO */}
      <p className="text-sm text-gray-500 mb-3">
        ⭐ {shop.rating} • ⏱ {shop.time}
      </p>

      {/* PRODUCTS */}
      {shopProducts.length === 0 ? (
        <p className="text-gray-500">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3">

          {shopProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white p-2 rounded shadow-sm"
            >

              {/* IMAGE */}
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-20 object-cover rounded mb-1"
              />

              {/* NAME */}
              <p className="text-xs">
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
      )}

    </div>
  );
};

export default ShopDetail;