import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../components/BackHeader";
import { useCart } from "../context/CartContext";
import { shops } from "../data/shops";

const Checkout = () => {

  const navigate = useNavigate();
  const { cart } = useCart();

  // ✅ SAME KEY AS CART
  const savedAddress = JSON.parse(
    localStorage.getItem("savedAddress")
  );

  // COUPON
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");

  // TOTAL
  const total = Object.values(cart).reduce((sum, shopItems) => {

    if (!Array.isArray(shopItems)) return sum;

    return (
      sum +
      shopItems.reduce(
        (s, item) => s + item.price * item.qty,
        0
      )
    );

  }, 0);

  // DELIVERY
  const deliveryFee = 20;

  // FINAL TOTAL
  const finalTotal = total + deliveryFee - discount;

  // SHOP NAME
  const getShopName = (id) => {

    const shop = shops.find(
      (s) => s.id === Number(id)
    );

    return shop ? shop.title : "Shop";
  };

  // APPLY COUPON
 const applyCoupon = () => {

  const coupons = {
    SAVE20: 20,
    FREEDEL: 40,
    WELCOME100: 100,
  };

  const upperCoupon = coupon.toUpperCase();

  if (coupons[upperCoupon]) {

    setDiscount(coupons[upperCoupon]);

    setMessage("✅ Coupon Applied");

  } else {

    setDiscount(0);

    setMessage("❌ Invalid Coupon");

  }

};
      

  return (
    <div className="bg-gray-100 min-h-screen pb-40">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 shadow-sm">

        <BackHeader title="Checkout" />

      </div>

      <div className="p-4">

        {/* ADDRESS */}
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">

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

              {/* ADDRESS */}
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

        {/* CART ITEMS */}
        {Object.keys(cart).map((shopId) => {

          const items = Array.isArray(cart[shopId])
            ? cart[shopId]
            : [];

          if (items.length === 0) return null;

          const shopTotal = items.reduce(
            (sum, item) =>
              sum + item.price * item.qty,
            0
          );

          return (

            <div
              key={shopId}
              className="bg-white rounded-3xl p-4 shadow-sm mb-4"
            >

              {/* SHOP NAME */}
              <h2 className="text-lg font-bold text-green-700 mb-4">

                {getShopName(shopId)}

              </h2>

              {/* ITEMS */}
              {items.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between border-b pb-3 mb-3"
                >

                  <div>

                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty : {item.qty}
                    </p>

                  </div>

                  <p className="font-bold">
                    ₹{item.price * item.qty}
                  </p>

                </div>

              ))}

              {/* SUBTOTAL */}
              <div className="flex justify-between font-semibold">

                <span>Subtotal</span>

                <span>₹{shopTotal}</span>

              </div>

            </div>

          );
        })}

        {/* COUPON */}
        <div className="bg-white rounded-3xl p-4 shadow-sm mb-4">

          <h2 className="text-lg font-bold mb-3">
            Apply Coupon
          </h2>

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) =>
                setCoupon(e.target.value)
              }
              className="flex-1 border rounded-2xl px-4 py-3 outline-none"
            />

            <button
              onClick={applyCoupon}
              className="bg-green-600 text-white px-5 rounded-2xl font-semibold"
            >
              Apply
            </button>

          </div>

          {message && (

            <p className="mt-3 text-sm">
              {message}
            </p>

          )}

        </div>

        {/* PRICE DETAILS */}
        <div className="bg-white rounded-3xl p-4 shadow-sm">

          <h2 className="text-lg font-bold mb-4">
            Price Details
          </h2>

          <div className="flex justify-between mb-3">

            <span>Total Price</span>

            <span>₹{total}</span>

          </div>

          <div className="flex justify-between mb-3">

            <span>Delivery Fee</span>

            <span>₹{deliveryFee}</span>

          </div>

          <div className="flex justify-between mb-3 text-green-600">

            <span>Coupon Discount</span>

            <span>- ₹{discount}</span>

          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg">

            <span>Final Total</span>

            <span>₹{finalTotal}</span>

          </div>

        </div>

      </div>

      {/* PAYMENT BUTTON */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 z-50">

        <button
          onClick={() => navigate("/payment")}
          className="w-full bg-green-600 text-white py-4 rounded-2xl text-lg font-bold"
        >
          Continue to Payment • ₹{finalTotal}
        </button>

      </div>

    </div>
  );
};

export default Checkout;