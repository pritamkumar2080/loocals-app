import BackHeader from "../components/BackHeader";
import React from "react";

const notifications = [
  {
    id: 1,
    title: "Order Confirmed 🎉",
    desc: "Your order has been placed successfully",
    time: "2 min ago",
  },
  {
    id: 2,
    title: "Out for Delivery 🚚",
    desc: "Your order is on the way",
    time: "10 min ago",
  },
  {
    id: 3,
    title: "50% OFF 🏷️",
    desc: "Get exciting offers on groceries",
    time: "1 hour ago",
  },
];

const Notification = () => {
  return (
    <div className="p-4">
      <BackHeader title="" />

      <h2 className="text-lg font-bold mb-4">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p>No notifications 😢</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-lg shadow-sm"
            >
              <p className="font-semibold text-sm">
                {item.title}
              </p>

              <p className="text-xs text-gray-500">
                {item.desc}
              </p>

              <p className="text-[10px] text-gray-400 mt-1">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Notification;