import BackHeader from "../components/BackHeader";

import React, {useState,useEffect,} from "react";

import { getFirebaseOrders,} from "../services/firebaseOrderService";

import {ref,onValue,} from "firebase/database";

import { db } from "../firebase";

import { useAuth } from "../context/AuthContext";

import {PackageCheck,Clock3,Truck, CheckCircle2, MapPin, CreditCard,Trash2,} from "lucide-react";

const Orders = () => {


  const [orders, setOrders] = useState([]);

  const { user } = useAuth();

  useEffect(() => {

  const ordersRef =
    ref(db, "orders");

  const unsubscribe =
    onValue(
      ordersRef,
      (snapshot) => {

        if (snapshot.exists()) {

          const data =
          Object.values(
            snapshot.val()
          );

          console.log("Current User UID:", user?.uid);
console.log("All Orders:", data);
        
        const userOrders =
          data.filter(
            (order) =>
              order.userId ===
              user?.uid
          );

          console.log("Filtered Orders:", userOrders);
        
        setOrders(
          userOrders
        );

          setOrders(data);

          console.log(
            "Realtime Orders:",
            data
          );

        } else {

          setOrders([]);
        }
      }
    );

  return () => unsubscribe();

}, [user]);
  // TRACKING STEPS
const getStatusIndex =
  (status) => {

    switch (status) {

      case "Pending":
        return 0;

      case "Accepted":
        return 1;

      case "Packed":
        return 1;

      case "Out For Delivery":
        return 2;

      case "Delivered":
        return 3;

      default:
        return 0;
    }
  };

  return (

    <div className="bg-[#f6f7fb] min-h-screen pb-28">

      {/* HEADER */}
      <div className="sticky top-0 z-30 bg-white border-b px-4 py-3">

        <BackHeader title="My Orders" />

      </div>

      <div className="p-4">

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="bg-white rounded-[32px] p-8 text-center shadow-sm mt-6">

            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto">

              <PackageCheck
                size={40}
                className="text-green-600"
              />

            </div>

            <h2 className="text-xl font-bold mt-5">

              No Orders Yet

            </h2>

            <p className="text-gray-500 text-sm mt-2">

              Start shopping and your orders
              will appear here

            </p>

          </div>

        ) : (

          <>

            {orders.map((order) => {

                 const currentStep =
                   getStatusIndex(
                     order.status
                   );

              return (

                <div
                  key={order.id}
                  className="bg-white rounded-[32px] p-4 shadow-sm mb-5"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start mb-4">

                    <div>

                      <p className="text-xs text-gray-400">

                        ORDER ID

                      </p>

                      <h2 className="font-bold text-sm">

                        #LOC{order.id}

                      </h2>

                    </div>

                    <div className="text-right">

                      <p className="text-xs text-gray-400">

                        ORDER DATE

                      </p>

                      <p className="text-sm font-medium">

                        {order.date}

                      </p>

                    </div>

                  </div>

                  {/* STATUS */}
                  <div className="bg-[#f8fafc] rounded-2xl p-4 mb-4">

                    <div className="flex justify-between items-center">

                      {/* STEP 1 */}
                      <div className="flex flex-col items-center flex-1">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep >= 0
                              ? "bg-green-600 text-white"
                              : "bg-gray-200"
                          }`}
                        >

                          <Clock3 size={18} />

                        </div>

                        <p className="text-[10px] mt-2 text-center">
                           Pending
                              </p>

                      </div>

                      <div className="h-[2px] flex-1 bg-gray-200 mx-1" />

                      {/* STEP 2 */}
                      <div className="flex flex-col items-center flex-1">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep >= 1
                              ? "bg-green-600 text-white"
                              : "bg-gray-200"
                          }`}
                        >

                          <PackageCheck size={18} />

                        </div>

                        <p className="text-[10px] mt-2 text-center"> 
                        Accepted
                        </p>

                      </div>

                      <div className="h-[2px] flex-1 bg-gray-200 mx-1" />

                      {/* STEP 3 */}
                      <div className="flex flex-col items-center flex-1">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep >= 2
                              ? "bg-green-600 text-white"
                              : "bg-gray-200"
                          }`}
                        >

                          <Truck size={18} />

                        </div>

                        <p className="text-[10px] mt-2 text-center">

                          Out For Delivery

                        </p>

                      </div>

                      <div className="h-[2px] flex-1 bg-gray-200 mx-1" />

                      {/* STEP 4 */}
                      <div className="flex flex-col items-center flex-1">

                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep >= 3
                              ? "bg-green-600 text-white"
                              : "bg-gray-200"
                          }`}
                        >

                          <CheckCircle2 size={18} />

                        </div>

                        <p className="text-[10px] mt-2 text-center">

                          Delivered

                        </p>

                      </div>

                    </div>

                  </div>
                  {order.status ===
                       "Cancelled" && (

                     <div className="bg-red-100 text-red-700 p-3 rounded-2xl mt-4 text-sm font-semibold">
                     This order has been cancelled.
                       </div>
                            )}

                  {/* PAYMENT */}
                  <div className="flex items-center justify-between bg-green-50 rounded-2xl p-3 mb-4">

                    <div className="flex items-center gap-2">

                      <CreditCard
                        size={18}
                        className="text-green-600"
                      />

                      <p className="text-sm font-medium">

                        {order.method}

                      </p>

                    </div>

                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-semibold">

                      PAID

                    </span>

                  </div>

                  {/* ADDRESS */}
                  {order.address && (

                    <div className="bg-[#f8fafc] rounded-2xl p-4 mb-4">

                      <div className="flex items-start gap-2">

                        <MapPin
                          size={18}
                          className="text-green-600 mt-1"
                        />

                        <div>

                          <p className="font-semibold text-sm">

                            {order.address.saveAs || "Home"}

                          </p>

                          <p className="text-sm text-gray-600 mt-1">

                            {order.address.fullAddress}

                          </p>

                          <p className="text-xs text-gray-400 mt-1">

                            {order.address.area},
                            {" "}
                            {order.address.city}

                          </p>

                        </div>

                      </div>

                    </div>

                  )}

                  {/* ITEMS */}
                  <div>

                    <h3 className="font-bold mb-3">

                      Items

                    </h3>

                    {Array.isArray(order.items) &&
                      order.items.map((item) => (

                        <div
                          key={item.id}
                          className="flex justify-between items-center border-b border-gray-100 py-3"
                        >

                          <div className="flex items-center gap-3">

                            {/* IMAGE */}
                            <img
                              src={
                                item.img
                                  ? `/images/${item.img
                                      .split("/")
                                      .pop()}`
                                  : "/images/default.png"
                              }
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover"
                            />

                            {/* INFO */}
                            <div>

                              <p className="text-sm font-medium line-clamp-1">

                                {item.name}

                              </p>

                              <p className="text-xs text-gray-400 mt-1">

                                Qty : {item.qty}

                              </p>

                            </div>

                          </div>

                          {/* PRICE */}
                          <p className="font-bold text-sm">

                            ₹{item.price * item.qty}

                          </p>

                        </div>

                      ))}

                    {/* PRICE DETAILS */}
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">

                      {/* SUBTOTAL */}
                      <div className="flex justify-between">

                        <p className="text-sm text-gray-500">

                          Subtotal

                        </p>

                        <p className="font-semibold">

                          ₹{order.subtotal || 0}

                        </p>

                      </div>

                      {/* DISCOUNT */}
                      {order.discount > 0 && (

                        <div className="flex justify-between text-green-600">

                          <p className="text-sm">

                            Coupon Discount

                          </p>

                          <p className="font-semibold">

                            - ₹{order.discount}

                          </p>

                        </div>

                      )}

                      {/* COUPON */}
                      {order.coupon && (

                        <div className="flex justify-between">

                          <p className="text-sm text-gray-500">

                            Coupon Code

                          </p>

                          <p className="font-semibold">

                            {order.coupon}

                          </p>

                        </div>

                      )}

                      {/* FINAL TOTAL */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">

                        <p className="text-sm font-semibold text-gray-500">

                          Final Amount

                        </p>

                        <p className="text-xl font-bold text-green-700">

                          ₹{order.finalTotal || 0}

                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              );

            })}

            {/* CLEAR BUTTON */}

          </>

        )}

      </div>

    </div>

  );

};

export default Orders;