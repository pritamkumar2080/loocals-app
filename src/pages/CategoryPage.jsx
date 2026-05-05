import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { shops } from "../data/shops";
import { useCart } from "../context/CartContext";
import { Plus, ArrowLeft } from "lucide-react";

const CategoryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 🔥 SAFE DECODE
  const decodedName = decodeURIComponent(name || "")
    .toLowerCase()
    .trim();

  // 🔥 FLEXIBLE FILTER (FIX)
  const filtered = products.filter((item) => {
    if (!item.category) return false;

    const cat = item.category.toLowerCase().trim();

    return cat.includes(decodedName);
  });

  // 🔥 GROUP BY SHOP (SAFE)
  const grouped = {};

  filtered.forEach((item) => {
    if (!grouped[item.shopId]) {
      grouped[item.shopId] = [];
    }
    grouped[item.shopId].push(item);
  });

  // 🔥 SHOP NAME
  const getShopName = (id) => {
    const shop = shops.find((s) => s.id === Number(id));
    return shop ? shop.title : "Shop";
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <h2 className="text-lg font-bold capitalize">
          {decodedName || "Category"}
        </h2>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found 😢
        </p>
      ) : (

        Object.keys(grouped).map((shopId) => {

          const items = Array.isArray(grouped[shopId])
            ? grouped[shopId]
            : [];

          if (items.length === 0) return null;

          return (
            <div key={shopId} className="mb-6">

              {/* SHOP TITLE */}
              <h3 className="text-sm font-semibold mb-2 text-green-700">
                {getShopName(shopId)}
              </h3>

              {/* PRODUCTS */}
              <div className="grid grid-cols-3 gap-3">

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm p-3 relative"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-24 object-contain mb-2"
                    />

                    <p className="text-sm font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      ₹{item.price}
                    </p>

                    <button
                      onClick={() => addToCart(item)}
                      className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ))}

              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CategoryPage;