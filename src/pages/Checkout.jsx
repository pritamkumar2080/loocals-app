import BackHeader from "../components/BackHeader";
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { shops } from "../data/shops";

const Checkout = () => {
  const { cart } = useCart();
  const { address } = useAddress();
  const navigate = useNavigate();

  // 🔥 TOTAL (FIXED)
  const total = Object.values(cart).reduce((sum, shopItems) => {
    if (!Array.isArray(shopItems)) return sum;

    return sum + shopItems.reduce(
      (s, item) => s + item.price * item.qty,
      0
    );
  }, 0);

  const delivery = 20;
  const finalTotal = total + delivery;

  const handleOrder = () => {
    navigate("/payment");
  };

  // 🔥 SHOP NAME
  const getShopName = (id) => {
    const shop = shops.find((s) => s.id === Number(id));
    return shop ? shop.title : "Shop";
  };

  return (
    <div className="p-4">
      <BackHeader title="checkout" />

      <h2 className="text-lg font-bold mb-3">
        Checkout
      </h2>

      {/* ADDRESS */}
      <div className="mb-3 bg-gray-100 p-2 rounded">
        <p className="text-xs text-gray-500">Deliver to</p>
        <p className="text-sm font-semibold">
          📍 {address || "No address added"}
        </p>
      </div>

      {/* 🔥 MULTI SHOP ITEMS */}
      {Object.keys(cart).map((shopId) => {

        const items = Array.isArray(cart[shopId])
          ? cart[shopId]
          : [];

        if (items.length === 0) return null;

        const shopTotal = items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );

        return (
          <div key={shopId} className="mb-4">

            {/* SHOP NAME */}
            <h3 className="font-semibold text-green-700 mb-1">
              {getShopName(shopId)}
            </h3>

            {/* ITEMS */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-1"
              >
                <p>{item.name} × {item.qty}</p>
                <p>₹{item.price * item.qty}</p>
              </div>
            ))}

            {/* SHOP SUBTOTAL */}
            <p className="flex justify-between text-sm font-medium mt-1">
              <span>Subtotal</span>
              <span>₹{shopTotal}</span>
            </p>

          </div>
        );
      })}

      {/* SUMMARY */}
      <div className="border-t pt-3 mt-3">
        <p className="flex justify-between">
          <span>Total</span>
          <span>₹{total}</span>
        </p>

        <p className="flex justify-between">
          <span>Delivery</span>
          <span>₹{delivery}</span>
        </p>

        <p className="flex justify-between font-bold mt-2">
          <span>Final Total</span>
          <span>₹{finalTotal}</span>
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleOrder}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
      >
        Continue to Payment
      </button>

    </div>
  );
};

export default Checkout;