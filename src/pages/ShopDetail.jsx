import BackHeader from "../components/BackHeader";
import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { shops } from "../data/shops";
import { useCart } from "../context/CartContext";

const ShopDetail = () => {

  const { id } = useParams();

  const shopId = Number(id);

  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const shop = shops.find(
    (s) => Number(s.id) === shopId
  );

  const shopProducts = products.filter(
    (p) => Number(p.shopId) === shopId
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

      {/* PRODUCTS */}
      {shopProducts.length === 0 ? (

        <p className="text-gray-500">
          No products found
        </p>

      ) : (

        <div className="grid grid-cols-3 gap-3">

          {shopProducts.map((item) => {

            const qty = getQty(item.id);

            return (

              <div
                key={item.id}
                className="bg-white p-2 rounded-2xl shadow-sm"
              >

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

export default ShopDetail;