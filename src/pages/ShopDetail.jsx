import BackHeader from "../components/BackHeader";

import React, {
  useState,
  useEffect,
} from "react";

import { useParams } from "react-router-dom";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase";

import { shops } from "../data/shops";

import { useCart } from "../context/CartContext";

import { useWishlist } from "../context/WishlistContext";

import { Heart } from "lucide-react";

import SearchBar from "../components/SearchBar";

const ShopDetail = () => {

  const { id } = useParams();

  const shopId = Number(id);

  // SEARCH
  const [search, setSearch] =
    useState("");

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

  // SHOP
  const shop = shops.find(
    (s) =>
      Number(s.id) === shopId
  );

  // FILTER PRODUCTS
  const shopProducts = products
    .filter(
      (p) =>
        Number(p.shopId) ===
        shopId
    )
    .filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // GET ITEM QTY
  const getQty = (itemId) => {

    const shopItems =
      Array.isArray(
        cart[shopId]
      )
        ? cart[shopId]
        : [];

    const found =
      shopItems.find(
        (item) =>
          item.id === itemId
      );

    return found
      ? found.qty
      : 0;

  };

  // SHOP NOT FOUND
  if (!shop) {

    return (

      <p className="p-4">

        Shop not found

      </p>

    );

  }

  return (

    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <BackHeader title="" />

      {/* SHOP IMAGE */}
      <img
        src={shop.img}
        alt={shop.title}
        className="w-full h-40 object-cover rounded-2xl mb-3"
      />

      {/* SHOP TITLE */}
      <h2 className="text-xl font-bold">

        {shop.title}

      </h2>

      {/* INFO */}
      <p className="text-sm text-gray-500 mb-4">

        ⭐ {shop.rating} • ⏱ {shop.time}

      </p>

      {/* SEARCH */}
      <div className="mb-4">

        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder={`Search in ${shop.title}`}
        />

      </div>

      {/* PRODUCTS */}
      {shopProducts.length === 0 ? (

        <div className="bg-white rounded-3xl p-8 text-center">

          <p className="text-gray-500">

            No products found

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-3 gap-3">

          {shopProducts.map(
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
                  className="bg-white p-2 rounded-2xl shadow-sm relative overflow-hidden"
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
                    className="w-full h-24 object-cover rounded-xl mb-2"
                  />

                  {/* NAME */}
                  <p className="text-xs line-clamp-1">

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

      )}

    </div>

  );

};

export default ShopDetail;