import React from "react";
import BackHeader from "../components/BackHeader";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {

  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // GET ITEM QTY
  const getQty = (itemId) => {

    let qty = 0;

    Object.values(cart).forEach((shopItems) => {

      if (!Array.isArray(shopItems)) return;

      const found = shopItems.find(
        (i) => i.id === itemId
      );

      if (found) {
        qty = found.qty;
      }

    });

    return qty;

  };

  return (

    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      <BackHeader title="Wishlist" />

      {/* EMPTY */}
      {wishlist.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <p className="text-5xl">
            ❤️
          </p>

          <p className="mt-3 text-gray-500">
            Your wishlist is empty
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-3 mt-4">

          {wishlist.map((item) => {

            const qty = getQty(item.id);

            return (

              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 shadow-sm relative"
              >

                {/* ❤️ REMOVE */}
                <button
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                  className="absolute top-2 right-2 text-red-500 text-lg"
                >
                  ❤️
                </button>

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-28 object-cover rounded-xl"
                />

                {/* NAME */}
                <p className="text-sm mt-2 font-medium line-clamp-1">
                  {item.name}
                </p>

                {/* PRICE + BUTTON */}
                <div className="mt-2 flex justify-between items-center">

                  {/* PRICE */}
                  <p className="text-sm font-bold">
                    ₹{item.price}
                  </p>

                  {/* BLINKIT STYLE BUTTON */}
                  {qty === 0 ? (

                    <button
                      onClick={() => addToCart(item)}
                      className="border border-green-600 text-green-600 bg-green-50 text-[10px] font-semibold px-3 py-1 rounded-lg"
                    >
                      ADD
                    </button>

                  ) : (

                    <div className="flex items-center bg-green-600 text-white rounded-lg overflow-hidden">

                      {/* MINUS */}
                      <button
                        onClick={() =>
                          decreaseQty(
                            item.shopId,
                            item.id
                          )
                        }
                        className="px-2 py-1 text-sm font-bold"
                      >
                        −
                      </button>

                      {/* QTY */}
                      <span className="px-2 text-xs font-semibold">
                        {qty}
                      </span>

                      {/* PLUS */}
                      <button
                        onClick={() =>
                          increaseQty(
                            item.shopId,
                            item.id
                          )
                        }
                        className="px-2 py-1 text-sm font-bold"
                      >
                        +
                      </button>

                    </div>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );

};

export default Wishlist;