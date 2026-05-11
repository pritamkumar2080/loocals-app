import BackHeader from "../components/BackHeader";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { shops } from "../data/shops";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";
import SearchBar from "../components/SearchBar";

const ShopDetail = () => {

  const { id } = useParams();

  const shopId = Number(id);

  // SEARCH STATE
  const [search, setSearch] =
    useState("");

  // ACTIVE IMAGE
  const [activeImage, setActiveImage] =
    useState(0);

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

  const shop = shops.find(
    (s) => Number(s.id) === shopId
  );

  // FILTER PRODUCTS
  const shopProducts = products
    .filter(
      (p) => Number(p.shopId) === shopId
    )
    .filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // GET ITEM QTY
  const getQty = (itemId) => {

    const shopItems = Array.isArray(
      cart[shopId]
    )
      ? cart[shopId]
      : [];

    const found = shopItems.find(
      (item) => item.id === itemId
    );

    return found ? found.qty : 0;

  };

  if (!shop) {

    return (
      <p className="p-4">
        Shop not found
      </p>
    );

  }

  return (

    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      <BackHeader title="" />

      {/* SHOP IMAGE SLIDER */}
      <div
        onScroll={(e) => {

          const scrollLeft =
            e.target.scrollLeft;

          const width =
            e.target.clientWidth;

          const index = Math.round(
            scrollLeft / width
          );

          setActiveImage(index);

        }}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide mb-3"
      >

        {shop.images.map(
          (img, index) => (

            <img
              key={index}
              src={img}
              alt="shop"
              className="w-full min-w-full h-40 object-cover rounded-2xl snap-center"
            />

          )
        )}

      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mb-4">

        {shop.images.map((_, index) => (

          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeImage === index
                ? "w-5 bg-green-600"
                : "w-2 bg-gray-300"
            }`}
          />

        ))}

      </div>

      {/* SHOP TITLE */}
      <h2 className="text-xl font-bold">
        {shop.title}
      </h2>

      {/* INFO */}
      <p className="text-sm text-gray-500 mb-4">
        ⭐ {shop.rating} • ⏱ {shop.time}
      </p>

      {/* SEARCH BAR */}
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

          {shopProducts.map((item) => {

            const qty = getQty(item.id);

            const liked =
              isInWishlist(item.id);

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

                {/* PRODUCT IMAGE */}
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

                  {/* ADD BUTTON */}
                  {qty === 0 ? (

                    <button
                      onClick={() =>
                        addToCart(item)
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

          })}

        </div>

      )}

    </div>

  );
};

export default ShopDetail;