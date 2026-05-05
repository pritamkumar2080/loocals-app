import React from "react";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="flex items-center gap-3 bg-white p-3 mb-3 rounded-lg shadow-sm">

      {/* 🔥 IMAGE */}
      <img
        src={item.img}
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />

      {/* 🔥 DETAILS */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">₹{item.price}</p>
        <p className="text-xs">Qty: {item.qty}</p>
      </div>

      {/* 🔥 REMOVE BUTTON */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 text-xs"
      >
        Remove
      </button>

    </div>
  );
};

export default CartItem;