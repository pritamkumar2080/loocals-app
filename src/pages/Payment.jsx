import BackHeader from "../components/BackHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { useOrder } from "../context/OrderContext"; // ✅ ADD
import { useCart } from "../context/CartContext";   // ✅ ADD

const Payment = () => {
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  const { address } = useAddress();
  const { addOrder } = useOrder();     // ✅ ADD
  const { cart } = useCart();          // ✅ ADD

  const handleOrder = () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    // 🔥 CREATE ORDER
    const newOrder = {
      id: Date.now(),
      items: cart,
      method,
      address,
      date: new Date().toLocaleString(),
    };

    addOrder(newOrder); // 🔥 SAVE ORDER

    localStorage.removeItem("cart");
    navigate("/success");
  };

  return (
    <div className="p-4">
      <BackHeader title="" />

      <h2 className="text-lg font-bold mb-4">
        Select Payment Method
      </h2>

      {/* ADDRESS */}
      <div className="mb-3 bg-gray-100 p-2 rounded">
        <p className="text-xs text-gray-500">Deliver to</p>
        <p className="text-sm font-semibold">
          📍 {address || "No address added"}
        </p>
      </div>

      {/* UPI */}
      <div
        onClick={() => setMethod("upi")}
        className={`p-3 mb-3 border rounded cursor-pointer ${
          method === "upi" ? "border-green-600" : ""
        }`}
      >
        UPI (Google Pay / PhonePe)
      </div>

      {/* CARD */}
      <div
        onClick={() => setMethod("card")}
        className={`p-3 mb-3 border rounded cursor-pointer ${
          method === "card" ? "border-green-600" : ""
        }`}
      >
        Credit / Debit Card
      </div>

      {/* COD */}
      <div
        onClick={() => setMethod("cod")}
        className={`p-3 mb-3 border rounded cursor-pointer ${
          method === "cod" ? "border-green-600" : ""
        }`}
      >
        Cash on Delivery (COD)
      </div>

      {/* BUTTON */}
      <button
        onClick={handleOrder}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg"
      >
        Place Order
      </button>

    </div>
  );
};

export default Payment;