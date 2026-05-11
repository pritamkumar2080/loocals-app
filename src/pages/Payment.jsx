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

  // ADDRESS
  const savedAddress = JSON.parse(
    localStorage.getItem("savedAddress")
  );

  // APPLIED COUPON
  const appliedCoupon = JSON.parse(
    localStorage.getItem("appliedCoupon")
  );

  const discount =
    appliedCoupon?.discount || 0;

  const coupon =
    appliedCoupon?.code || "";

  // CART ITEMS
  const items = Object.values(cart).flat();

  // SUBTOTAL
  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  // FINAL TOTAL
  const finalTotal =
    subtotal - discount;

  // PLACE ORDER
  const handleOrder = () => {

    if (!method) {

      alert(
        "Please select payment method"
      );

      return;
    }

    // CREATE ORDER
    const newOrder = {

      id: Date.now(),

      items,

      method,

      address: savedAddress,

      date: new Date().toLocaleString(),

      // ✅ IMPORTANT
      subtotal,

      discount,

      coupon,

      finalTotal,
    };

    // SAVE ORDER
    addOrder(newOrder);

    // CLEAR CART
    localStorage.removeItem("cart");

    // REMOVE COUPON
    localStorage.removeItem(
      "appliedCoupon"
    );

    // SUCCESS PAGE
    navigate("/success");
  };

  return (

    <div className="bg-gray-100 min-h-screen pb-44">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white shadow-sm px-4 py-3">

        <BackHeader title="Select Payment Mode" />

      </div>

      <div className="p-4">

        {/* ADDRESS */}
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-5">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-lg font-bold">
              Delivery Address
            </h2>

            <button
              onClick={() =>
                navigate("/address")
              }
              className="text-green-600 text-sm font-semibold"
            >
              Change
            </button>

          </div>

          {savedAddress ? (

            <>

              <p className="font-bold text-black">

                {savedAddress.saveAs || "Home"}

              </p>

              <p className="text-gray-700 text-sm mt-2 leading-6">

                {savedAddress.fullAddress}

              </p>

              <p className="text-gray-500 text-sm mt-2">

                {savedAddress.area},
                {" "}
                {savedAddress.city}

              </p>

              {savedAddress.receiverName && (

                <p className="text-gray-500 text-sm mt-2">

                  Receiver:
                  {" "}
                  {
                    savedAddress.receiverName
                  }

                </p>

              )}

              {savedAddress.receiverPhone && (

                <p className="text-gray-500 text-sm mt-1">

                  Phone:
                  {" "}
                  {
                    savedAddress.receiverPhone
                  }

                </p>

              )}

            </>

          ) : (

            <p className="text-gray-500">
              No address added
            </p>

          )}

        </div>

        {/* PRICE DETAILS */}
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-5">

          <h2 className="text-lg font-bold mb-4">

            Price Details

          </h2>

          <div className="flex justify-between mb-3">

            <span>Subtotal</span>

            <span>₹{subtotal}</span>

          </div>

          {discount > 0 && (

            <div className="flex justify-between mb-3 text-green-600">

              <span>
                Coupon Discount
              </span>

              <span>
                - ₹{discount}
              </span>

            </div>

          )}

          {coupon && (

            <div className="flex justify-between mb-3">

              <span>
                Coupon Code
              </span>

              <span>
                {coupon}
              </span>

            </div>

          )}

          <div className="border-t pt-4 flex justify-between font-bold text-lg">

            <span>Final Total</span>

            <span>
              ₹{finalTotal}
            </span>

          </div>

        </div>

        {/* PAYMENT OPTIONS */}

        {/* UPI */}
        <div
          onClick={() =>
            setMethod("upi")
          }
          className={`p-4 mb-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
            method === "upi"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >

          <p className="font-semibold text-lg">
            UPI
          </p>

          <p
            className={`text-sm mt-1 ${
              method === "upi"
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            Google Pay / PhonePe /
            Paytm
          </p>

        </div>

        {/* CARD */}
        <div
          onClick={() =>
            setMethod("card")
          }
          className={`p-4 mb-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
            method === "card"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >

          <p className="font-semibold text-lg">
            Credit / Debit Card
          </p>

          <p
            className={`text-sm mt-1 ${
              method === "card"
                ? "text-white"
                : "text-gray-500"
            }`}
          >
            Visa / MasterCard /
            RuPay
          </p>

        </div>

        {/* COD */}
        <div
          onClick={() =>
            setMethod("cod")
          }
          className={`p-4 mb-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
            method === "cod"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200"
          }`}
        >

          <p className="font-semibold text-lg">
            Cash on Delivery
          </p>

          <p
            className={`text-sm mt-1 ${
              method === "cod"
                ? "text-white"
                : "text-gray-500"
            }`}
          >
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
          Place Order • ₹
          {finalTotal}
        </button>

      </div>

    </div>
  );
};

export default Payment;