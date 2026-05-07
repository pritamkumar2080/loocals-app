import BackHeader from "../components/BackHeader";
import React from "react";
import { useOrder } from "../context/OrderContext";

const Orders = () => {

  const { orders, clearOrders } = useOrder();

  return (
    <div className="bg-gray-100 min-h-screen pb-24">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white shadow-sm px-4 py-3">

        <BackHeader title="Orders" />

      </div>

      <div className="p-4">

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl p-6 text-center shadow-sm">

            <p className="text-gray-500 text-lg">
              No orders yet 😢
            </p>

          </div>

        ) : (

          <>
            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white rounded-3xl p-4 shadow-sm mb-4"
              >

                {/* ORDER DATE */}
                <p className="text-xs text-gray-500 mb-2">
                  {order.date}
                </p>

                {/* PAYMENT */}
                <div className="flex justify-between items-center mb-3">

                  <p className="font-semibold">
                    Payment Method
                  </p>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    {order.method}
                  </span>

                </div>

                {/* ADDRESS */}
                {order.address && (

                  <div className="bg-gray-50 rounded-2xl p-3 mb-4">

                    <p className="font-semibold text-sm mb-2">
                      Delivery Address
                    </p>

                    <p className="text-sm font-medium">
                      {order.address.saveAs || "Home"}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {order.address.fullAddress}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {order.address.area},
                      {" "}
                      {order.address.city}
                    </p>

                    {order.address.receiverName && (

                      <p className="text-xs text-gray-500 mt-1">
                        Receiver:
                        {" "}
                        {order.address.receiverName}
                      </p>

                    )}

                    {order.address.receiverPhone && (

                      <p className="text-xs text-gray-500 mt-1">
                        Phone:
                        {" "}
                        {order.address.receiverPhone}
                      </p>

                    )}

                  </div>

                )}

                {/* ITEMS */}
                <div>

                  <h3 className="font-semibold mb-3">
                    Ordered Items
                  </h3>

                  {Array.isArray(order.items) &&
                    order.items.map((item) => (

                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-3 mb-3"
                      >

                        <div>

                          <p className="font-medium">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            Qty : {item.qty}
                          </p>

                        </div>

                        <p className="font-bold">
                          ₹{item.price * item.qty}
                        </p>

                      </div>

                    ))}

                </div>

              </div>

            ))}

            {/* CLEAR BUTTON BOTTOM */}
            {orders.length > 0 && (

              <button
                onClick={clearOrders}
                className="w-full bg-red-500 text-white py-3 rounded-2xl text-sm font-semibold mt-2"
              >
                Clear All Orders
              </button>

            )}

          </>

        )}

      </div>

    </div>
  );
};

export default Orders;