import BackHeader from "../components/BackHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useCart } from "../context/CartContext";

const Payment = () => {

  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { addOrder } = useOrder();
  const { cart } = useCart();

  // ✅ SAME ADDRESS AS CART & CHECKOUT
  const savedAddress = JSON.parse(
    localStorage.getItem("savedAddress")
  );

  // 🔥 PLACE ORDER
  const handleOrder = () => {

    if (!method) {

      alert("Please select payment method");
      return;

    }

    // 🔥 CREATE ORDER
    const newOrder = {
      id: Date.now(),

      // ✅ FIXED
      items: Object.values(cart).flat(),

      method,
      address: savedAddress,
      date: new Date().toLocaleString(),
    };

    // SAVE ORDER
    addOrder(newOrder);

    // CLEAR CART
    localStorage.removeItem("cart");

    // SUCCESS PAGE
    navigate("/success");
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-28">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white shadow-sm px-4 py-3">

        <BackHeader title="Payment" />

      </div>

      <div className="p-4">

        {/* PAGE TITLE */}
        <h2 className="text-xl font-bold mb-4">
          Select Payment Method
        </h2>

        {/* ADDRESS */}
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-5">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-lg font-bold">
              Delivery Address
            </h2>

            <button
              onClick={() => navigate("/address")}
              className="text-green-600 text-sm font-semibold"
            >
              Change
            </button>

          </div>

          {savedAddress ? (

            <>

              {/* SAVE AS */}
              <p className="font-bold text-black">
                {savedAddress.saveAs || "Home"}
              </p>

              {/* FULL ADDRESS */}
              <p className="text-gray-700 text-sm mt-2 leading-6">
                {savedAddress.fullAddress}
              </p>

              {/* AREA CITY */}
              <p className="text-gray-500 text-sm mt-2">
                {savedAddress.area},
                {" "}
                {savedAddress.city}
              </p>

              {/* RECEIVER */}
              {savedAddress.receiverName && (

                <p className="text-gray-500 text-sm mt-2">
                  Receiver:
                  {" "}
                  {savedAddress.receiverName}
                </p>

              )}

              {/* PHONE */}
              {savedAddress.receiverPhone && (

                <p className="text-gray-500 text-sm mt-1">
                  Phone:
                  {" "}
                  {savedAddress.receiverPhone}
                </p>

              )}

            </>

          ) : (

            <p className="text-gray-500">
              No address added
            </p>

          )}

        </div>

        {/* PAYMENT OPTIONS */}

        {/* UPI */}
        <div
          onClick={() => setMethod("upi")}
          className={`p-4 mb-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
            method === "upi"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >

          <p className="font-semibold text-lg">
            UPI
          </p>

          <p className={`text-sm mt-1 ${
            method === "upi"
              ? "text-white"
              : "text-gray-500"
          }`}>
            Google Pay / PhonePe / Paytm
          </p>

        </div>

        {/* CARD */}
        <div
          onClick={() => setMethod("card")}
          className={`p-4 mb-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
            method === "card"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >

          <p className="font-semibold text-lg">
            Credit / Debit Card
          </p>

          <p className={`text-sm mt-1 ${
            method === "card"
              ? "text-white"
              : "text-gray-500"
          }`}>
            Visa / MasterCard / RuPay
          </p>

        </div>

        {/* COD */}
        <div
          onClick={() => setMethod("cod")}
          className={`p-4 mb-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
            method === "cod"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >

          <p className="font-semibold text-lg">
            Cash on Delivery
          </p>

          <p className={`text-sm mt-1 ${
            method === "cod"
              ? "text-white"
              : "text-gray-500"
          }`}>
            Pay after delivery
          </p>

        </div>

      </div>

      {/* FIXED BUTTON */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-50">

        <button
          onClick={handleOrder}
          className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg font-bold"
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default Payment;