import React from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FloatingCart = () => {

  const navigate = useNavigate();

  const { cart } = useCart();

  // TOTAL COUNT
  const count = Object.values(cart).reduce((sum, shopItems) => {

    if (!Array.isArray(shopItems)) return sum;

    return sum + shopItems.reduce(
      (s, item) => s + item.qty,
      0
    );

  }, 0);

  return (

    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-15 right-4 z-50"
    >

      {/* MAIN BUTTON */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 shadow-[0_10px_30px_rgba(34,197,94,0.4)] border-4 border-white active:scale-95 transition-all duration-200">

        {/* ICON */}
        <ShoppingCart
          size={26}
          className="text-white"
        />

        {/* COUNT */}
        {count > 0 && (

          <div className="absolute -top-1 -right-1 min-w-[24px] h-6 px-1 bg-white text-green-600 rounded-full flex items-center justify-center text-xs font-bold shadow-md">

            {count}

          </div>

        )}

      </div>

    </button>

  );
};

export default FloatingCart;