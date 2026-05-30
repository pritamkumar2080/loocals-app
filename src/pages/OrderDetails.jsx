import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getFirebaseOrders,
} from "../../services/firebaseOrderService";

import {
  getFirebaseShops,
} from "../../services/firebaseShopService";

const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [shops, setShops] =
    useState([]);

  useEffect(() => {

    const loadOrder =
      async () => {

        const ordersData =
          await getFirebaseOrders();

        const shopsData =
          await getFirebaseShops();

        setShops(
          shopsData || []
        );

        const foundOrder =
          ordersData.find(
            (o) =>
              String(o.id) ===
              String(id)
          );

        setOrder(
          foundOrder || null
        );
      };

    loadOrder();

  }, [id]);

  // LOADING
  if (!order) {
    return (
      <div className="bg-white p-6 rounded-2xl">
        <h2 className="text-2xl font-bold">
          Order Not Found
        </h2>
      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="flex justify-between items-start flex-wrap gap-4">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              Order #{order.id}

            </h1>

            <p className="text-slate-500 mt-2">

              {order.date}

            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              (order.status || "Pending") ===
              "Delivered"
                ? "bg-green-100 text-green-700"
                : (order.status || "Pending") ===
                  "Pending"
                ? "bg-orange-100 text-orange-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >

            {order.status || "Pending"}

          </span>

        </div>

      </div>

      {/* CUSTOMER + PAYMENT */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* ADDRESS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-5">

            Delivery Address

          </h2>

          <div className="space-y-3">

            <p className="font-semibold text-lg">

              {order.address?.saveAs ||
                "Home"}

            </p>

            <p className="text-slate-600 leading-7">

              {
                order.address
                  ?.fullAddress
              }

            </p>

            <p className="text-slate-500">

              {
                order.address?.area
              }
              ,{" "}
              {
                order.address?.city
              }

            </p>

            {order.address
              ?.receiverName && (

              <p>

                <span className="font-semibold">

                  Receiver:

                </span>{" "}

                {
                  order.address
                    ?.receiverName
                }

              </p>

            )}

            {order.address
              ?.receiverPhone && (

              <p>

                <span className="font-semibold">

                  Phone:

                </span>{" "}

                {
                  order.address
                    ?.receiverPhone
                }

              </p>

            )}

          </div>

        </div>

        {/* PAYMENT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-5">

            Payment Details

          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-slate-500">

                Payment Method

              </span>

              <span className="font-semibold uppercase">

                {order.method}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">

                Subtotal

              </span>

              <span className="font-semibold">

                ₹{order.subtotal}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">

                Discount

              </span>

              <span className="font-semibold text-green-600">

                - ₹
                {order.discount || 0}

              </span>

            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">

              <span>

                Final Total

              </span>

              <span>

                ₹{order.finalTotal}

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-6">

          Ordered Products

        </h2>

        <div className="space-y-4">

          {order.items?.map(
            (item) => {

              const shop =
                shops.find(
                  (s) =>
                    Number(s.id) ===
                    Number(
                      item.shopId
                    )
                );

              return (

                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-2xl p-4"
                >

                  <div className="flex items-center gap-4">

                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover border"
                    />

                    <div>

                      <h3 className="font-bold text-lg">

                        {item.name}

                      </h3>

                      <p className="text-slate-500 text-sm mt-1">

                        Shop:{" "}
                        {
                          shop?.title ||
                          "Shop"
                        }

                      </p>

                      <p className="text-slate-500 text-sm">

                        Quantity:{" "}
                        {item.qty}

                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-lg">

                      ₹
                      {item.price *
                        item.qty}

                    </p>

                    <p className="text-sm text-slate-500 mt-1">

                      ₹{item.price}
                      {" "}each

                    </p>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;