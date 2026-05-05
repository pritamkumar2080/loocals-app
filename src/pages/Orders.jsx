import BackHeader from "../components/BackHeader";
import React from "react";
import { useOrder } from "../context/OrderContext";
import { shops } from "../data/shop";

const Orders = () => {
  const { orders, clearOrders } = useOrder();

  const getShopName = (id) => {
    const shop = shops.find((s) => s.id === Number(id));
    return shop ? shop.title : "Shop";
  };

  return (
    <div className="p-4">
      <BackHeader title="" />

      <h2 className="text-lg font-bold mb-3">
        Your Orders
      </h2>

      {orders.length > 0 && (
        <button
          onClick={clearOrders}
          className="mb-3 bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Orders
        </button>
      )}

      {orders.length === 0 ? (
        <p>No orders yet 😢</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-3 mb-3 rounded shadow"
          >

            {/* ORDER INFO */}
            <p className="text-xs text-gray-500">
              {order.date}
            </p>

            <p className="text-sm font-semibold">
              Payment: {order.method}
            </p>

            <p className="text-xs mb-2">
              📍 {order.address}
            </p>

            {/* 🔥 MULTI SHOP ITEMS */}
            {order.shops &&
              Object.keys(order.shops).map((shopId) => {

                const items = Array.isArray(order.shops[shopId])
                  ? order.shops[shopId]
                  : [];

                if (items.length === 0) return null;

                return (
                  <div key={shopId} className="mb-2">

                    {/* SHOP NAME */}
                    <p className="text-xs font-semibold text-green-700">
                      {getShopName(shopId)}
                    </p>

                    {/* ITEMS */}
                    {items.map((item) => (
                      <p key={item.id} className="text-xs ml-2">
                        {item.name} × {item.qty}
                      </p>
                    ))}

                  </div>
                );
              })}

          </div>
        ))
      )}

    </div>
  );
};

export default Orders;