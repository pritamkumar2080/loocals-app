import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase";

import { useCart } from "../context/CartContext";

import { useWishlist } from "../context/WishlistContext";

import { Heart } from "lucide-react";

const CategoryPreview = ({
  title,
  category,
  color,
}) => {

  const navigate = useNavigate();

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

  // CART
  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // ❤️ WISHLIST
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  // FILTER PRODUCTS
  const filteredProducts =
    products
      .filter(
        (item) =>
          item.category ===
          category
      )
      .slice(0, 6);

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

    <div className={`${color} rounded-3xl p-4 mt-5 shadow-sm`}>

      {/* TOP */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold">

          {title}

        </h2>

        {/* ARROW */}
        <button
          onClick={() =>
            navigate(
              `/category/${category}`
            )
          }
          className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center"
        >

          →

        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3">

        {filteredProducts.map(
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
                className="bg-white rounded-2xl p-2 relative overflow-hidden"
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
                  className="w-full h-32 object-cover rounded-xl"
                />

                {/* NAME */}
                <p className="text-xs mt-2 line-clamp-1">

                  {item.name}

                </p>

                {/* PRICE + BUTTON */}
                <div className="mt-2 flex justify-between items-center">

                  <p className="font-bold text-sm">

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
                      className="border border-green-600 text-green-600 bg-green-50 text-xs font-semibold px-4 py-1 rounded-lg"
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

export default CategoryPreview;