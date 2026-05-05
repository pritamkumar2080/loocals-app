import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FloatingCart = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // 🔥 FIX HERE
  const count = Object.values(cart).reduce((sum, shopItems) => {
    if (!Array.isArray(shopItems)) return sum;

    return sum + shopItems.reduce((s, item) => s + item.qty, 0);
  }, 0);

  return (
    <div
      onClick={() => navigate("/cart")}
      className="fixed bottom-15 right-4 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
    >
      <ShoppingCart size={20} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-green-600 text-xs px-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default FloatingCart;