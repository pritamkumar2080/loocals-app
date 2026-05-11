import React, {
  useEffect,
  useState,
} from "react";

import BackHeader from "../components/BackHeader";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase";

import { useWishlist } from "../context/WishlistContext";

import { useCart } from "../context/CartContext";

import { Heart } from "lucide-react";

const Wishlist = () => {

  // PRODUCTS
  const [products, setProducts] =
    useState([]);

  // FETCH PRODUCTS
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

  // REALTIME WISHLIST PRODUCTS
  const updatedWishlist =
    wishlist.map((wishItem) => {

      const updated =
        products.find(
          (p) =>
            p.id === wishItem.id
        );

      return (
        updated || wishItem
      );

    });

  // GET ITEM QTY
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

    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      <BackHeader title="Wishlist" />

      {/* EMPTY */}
      {updatedWishlist.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20">

          <Heart
            size={60}
            className="fill-red-500 text-red-500"
          />

          <p className="mt-3 text-gray-500">

            Your wishlist is empty

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-2 gap-3 mt-4">

          {updatedWishlist.map(
            (item) => {

              const qty =
                getQty(item.id);

              return (

                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3 shadow-sm relative overflow-hidden"
                >

                  {/* ❤️ REMOVE */}
                  <button
                    onClick={() =>
                      removeFromWishlist(
                        item.id
                      )
                    }
                    className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm"
                  >

                    <Heart
                      size={16}
                      className="fill-red-500 text-red-500"
                    />

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

      )}

    </div>

  );

};

export default Wishlist;