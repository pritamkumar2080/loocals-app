import React, {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase";

import { shops } from "../data/shops";

import { useCart } from "../context/CartContext";

import { ArrowLeft } from "lucide-react";

import SearchBar from "../components/SearchBar";

const CategoryPage = () => {

  const { name } = useParams();

  const navigate = useNavigate();

  // FIREBASE PRODUCTS
  const [products, setProducts] =
    useState([]);

  // SEARCH
  const [search, setSearch] =
    useState("");

  // FETCH PRODUCTS
  useEffect(() => {

    const productsRef = ref(
      db,
      "products"
    );

    onValue(productsRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        setProducts(data);

      }

    });

  }, []);

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // SAFE DECODE
  const decodedName =
    decodeURIComponent(name || "")
      .toLowerCase()
      .trim();

  // FILTER PRODUCTS
  const filtered = products
    .filter((item) => {

      if (!item.category)
        return false;

      const cat =
        item.category
          .toLowerCase()
          .trim();

      return cat.includes(
        decodedName
      );

    })
    .filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // GROUP BY SHOP
  const grouped = {};

  filtered.forEach((item) => {

    if (!grouped[item.shopId]) {

      grouped[item.shopId] = [];

    }

    grouped[item.shopId].push(
      item
    );

  });

  // GET SHOP NAME
  const getShopName = (id) => {

    const shop = shops.find(
      (s) =>
        s.id === Number(id)
    );

    return shop
      ? shop.title
      : "Shop";

  };

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

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">

        <ArrowLeft
          onClick={() =>
            navigate(-1)
          }
          className="cursor-pointer"
        />

        <h2 className="text-lg font-bold capitalize">

          {decodedName ||
            "Category"}

        </h2>

      </div>

      {/* SEARCH */}
      <div className="mb-5">

        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder={`Search in ${decodedName}`}
        />

      </div>

      {/* EMPTY */}
      {filtered.length === 0 ? (

        <div className="bg-white rounded-3xl p-8 text-center">

          <p className="text-gray-500">

            No products found 😢

          </p>

        </div>

      ) : (

        Object.keys(grouped).map(
          (shopId) => {

            const items =
              Array.isArray(
                grouped[shopId]
              )
                ? grouped[
                    shopId
                  ]
                : [];

            if (
              items.length === 0
            )
              return null;

            return (

              <div
                key={shopId}
                className="mb-6"
              >

                {/* SHOP TITLE */}
                <h3 className="text-sm font-semibold mb-2 text-green-700">

                  {getShopName(
                    shopId
                  )}

                </h3>

                {/* PRODUCTS */}
                <div className="grid grid-cols-3 gap-3">

                  {items.map(
                    (item) => {

                      const qty =
                        getQty(
                          item.id
                        );

                      return (

                        <div
                          key={
                            item.id
                          }
                          className="bg-white rounded-xl shadow-sm p-3"
                        >

                          {/* IMAGE */}
                          <img
                            src={
                              item.img
                            }
                            alt={
                              item.name
                            }
                            className="w-full h-24 object-contain mb-2"
                          />

                          {/* NAME */}
                          <p className="text-sm font-medium line-clamp-1">

                            {
                              item.name
                            }

                          </p>

                          {/* PRICE + BUTTON */}
                          <div className="mt-2 flex justify-between items-center">

                            <p className="text-sm font-bold">

                              ₹
                              {
                                item.price
                              }

                            </p>

                            {/* BUTTON */}
                            {qty ===
                            0 ? (

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

                                  {
                                    qty
                                  }

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

          }
        )

      )}

    </div>

  );
};

export default CategoryPage;