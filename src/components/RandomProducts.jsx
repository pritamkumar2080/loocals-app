import React, {
  useEffect,
  useState,
} from "react";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase";

import { useCart } from "../context/CartContext";

import { useWishlist } from "../context/WishlistContext";

import { Heart } from "lucide-react";

const RandomProducts = () => {

  // PRODUCTS
  const [products, setProducts] =
    useState([]);

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  // ✅ FETCH PRODUCTS
  useEffect(() => {

    const productsRef = ref(
      db,
      "products"
    );

    onValue(productsRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        // OBJECT → ARRAY
        const productArray =
          Object.values(data);

        // ✅ FIX IMAGE PATH
        const fixedProducts =
          productArray.map((item) => {

            // FILE NAME
            const fileName =
              item.img
                ?.split("/")
                .pop();

            return {

              ...item,

              // NEW IMAGE PATH
              img: `/images/${fileName}`,

            };

          });

        setProducts(fixedProducts);

      }

    });

  }, []);

  // ✅ RANDOM PRODUCTS
  const randomProducts =
    [...products]
      .sort(
        () =>
          0.5 - Math.random()
      )
      .slice(0, 60);

  // ✅ GET ITEM QTY
  const getQty = (itemId) => {

    let qty = 0;

    Object.values(cart).forEach(
      (shopItems) => {

        if (
          !Array.isArray(shopItems)
        )
          return;

        const found =
          shopItems.find(
            (i) =>
              i.id === itemId
          );

        if (found) {

          qty = found.qty;

        }

      }
    );

    return qty;

  };

  return (

    <div className="mt-4 px-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">

        <h2 className="text-sm font-semibold">

          Popular Products

        </h2>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-3">

        {randomProducts.map(
          (item) => {

            const qty =
              getQty(item.id);

            const liked =
              isInWishlist(
                item.id
              );

            return (

              <div
                key={item.id}
                className="bg-white p-2 rounded-lg shadow-sm relative overflow-hidden"
              >

                {/* ❤️ WISHLIST */}
                <button
                  onClick={() =>

                    liked
                      ? removeFromWishlist(
                          item.id
                        )
                      : addToWishlist(
                          item
                        )

                  }
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow-sm"
                >

                  <Heart
                    size={16}
                    className={
                      liked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />

                </button>

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded"
                />

                {/* NAME */}
                <p className="text-xs mt-1 line-clamp-1">

                  {item.name}

                </p>

                {/* PRICE + BUTTON */}
                <div className="flex justify-between items-center mt-2">

                  <p className="text-sm font-bold">

                    ₹{item.price}

                  </p>

                  {/* BUTTON */}
                  {qty === 0 ? (

                    <button
                      onClick={() =>
                        addToCart(
                          item
                        )
                      }
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

          }
        )}

      </div>

    </div>

  );

};

export default RandomProducts;