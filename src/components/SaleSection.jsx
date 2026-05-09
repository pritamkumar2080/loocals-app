import React, { useMemo } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const SaleSection = () => {

  // CART
  const {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // ONLY SALE PRODUCTS
  const saleProducts = useMemo(() => {

    return products
      .filter((item) => item.isOnSale)
      .slice(0, 6);

  }, []);

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

    <div className="mt-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-4 shadow-sm overflow-hidden relative">

      {/* SALE BADGE */}
      <div className="absolute top-0 right-0 bg-yellow-300 px-3 py-1 rounded-bl-2xl">

        <p className="text-xs font-bold text-black">
          SALE
        </p>

      </div>

      {/* TITLE */}
      <div className="mb-4">

        <h2 className="text-xl font-bold text-white">
          Mega Deals 🔥
        </h2>

        <p className="text-sm text-red-100 mt-1">
          Extra discounts on selected items
        </p>

      </div>

      {/* SCROLLABLE PRODUCTS */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">

        {saleProducts.map((item) => {

          const qty = getQty(item.id);

          // DYNAMIC SALE PRICE
          const salePrice =
            item.price -
            (item.price * item.discount) / 100;

          return (

            <div
              key={item.id}
              className="min-w-[140px] bg-white rounded-2xl p-2 flex-shrink-0"
            >

              {/* IMAGE */}
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-28 object-cover rounded-xl"
              />

              {/* PRICE + BUTTON */}
              <div className="mt-2 flex justify-between items-center">

                <div>

                  {/* SALE PRICE */}
                  <p className="text-red-500 font-bold text-sm">
                    ₹{Math.floor(salePrice)}
                  </p>

                  {/* OLD PRICE */}
                  <p className="text-[10px] text-gray-400 line-through">
                    ₹{item.price}
                  </p>

                </div>

                {/* BLINKIT STYLE BUTTON */}
                {qty === 0 ? (

                  <button
                    onClick={() =>
                      addToCart({
                        ...item,
                        price: Math.floor(salePrice),
                      })
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

              {/* NAME */}
              <p className="text-[11px] mt-2 line-clamp-2">
                {item.name}
              </p>

              {/* DISCOUNT TAG */}
              <div className="mt-2 bg-red-100 text-red-500 text-[10px] font-bold px-2 py-1 rounded-lg text-center">

                {item.discount}% OFF

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );
};

export default SaleSection;