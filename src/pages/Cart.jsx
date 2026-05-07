import BackHeader from "../components/BackHeader";
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { shops } from "../data/shops";

const Cart = () => {

  const { cart, increaseQty, decreaseQty } = useCart();

  const navigate = useNavigate();

  // GET SAVED ADDRESS
  const savedAddress = JSON.parse(
    localStorage.getItem("savedAddress")
  );

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

  // SHOP NAME
  const getShopName = (id) => {

    const shop = shops.find(
      (s) => s.id === Number(id)
    );

    return shop ? shop.title : "Shop";
  };

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      <BackHeader title="cart" />

      <h2 className="text-lg font-bold mb-3">
        Your Cart
      </h2>

      {/* ADDRESS */}
      <div className="mb-4">

        <p className="text-sm font-semibold mb-2">
          Delivery Address
        </p>

        <div
          onClick={() => navigate("/address")}
          className="w-full border p-4 rounded-2xl bg-white cursor-pointer shadow-sm"
        >

          {savedAddress ? (

            <>
              {/* SAVE AS */}
              <p className="font-bold text-sm text-black">
                {savedAddress.saveAs || "Home"}
              </p>

              {/* FULL ADDRESS */}
              <p className="text-gray-700 text-sm mt-2 leading-5">
                {savedAddress.fullAddress}
              </p>

              {/* AREA + CITY */}
              <p className="text-gray-500 text-xs mt-2">
                {savedAddress.area}, {savedAddress.city}
              </p>

              {/* RECEIVER */}
              {savedAddress.receiverName && (

                <p className="text-gray-500 text-xs mt-2">
                  Receiver: {savedAddress.receiverName}
                </p>

              )}

              {/* PHONE */}
              {savedAddress.receiverPhone && (

                <p className="text-gray-500 text-xs mt-1">
                  Phone: {savedAddress.receiverPhone}
                </p>

              )}

            </>

          ) : (

            <p className="text-gray-500">
              Select Address
            </p>

          )}

        </div>

      </div>

      {/* EMPTY CART */}
      {Object.keys(cart).length === 0 ? (

        <p className="text-center text-gray-500 mt-10">
          Cart is empty 😢
        </p>

      ) : (

        <>
          {/* SHOP LOOP */}
          {Object.keys(cart).map((shopId) => {

            const items = Array.isArray(cart[shopId])
              ? cart[shopId]
              : [];

            if (items.length === 0) return null;

            return (
              <div key={shopId} className="mb-5">

                {/* SHOP TITLE */}
                <h3 className="text-sm font-bold text-green-700 mb-2">
                  {getShopName(shopId)}
                </h3>

                {/* ITEMS */}
                {items.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white p-3 mb-2 rounded-xl shadow-sm"
                  >

                    {/* IMAGE */}
                    <img
                      src={item.img ? item.img : "/fallback.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    {/* DETAILS */}
                    <div className="flex-1">

                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        ₹{item.price}
                      </p>

                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          decreaseQty(Number(shopId), item.id)
                        }
                        className="bg-gray-200 px-2 rounded"
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          increaseQty(Number(shopId), item.id)
                        }
                        className="bg-green-600 text-white px-2 rounded"
                      >
                        +
                      </button>

                    </div>

                  </div>

                ))}

              </div>
            );
          })}

          {/* TOTAL */}
          <h3 className="mt-4 font-bold text-lg">
            Total: ₹{total}
          </h3>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold"
          >
            Proceed to Checkout
          </button>

        </>

      )}

    </div>
  );
};

export default Cart;