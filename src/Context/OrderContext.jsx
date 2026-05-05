import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {

  // 🔥 LOAD FROM LOCALSTORAGE (safe)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 🔥 AUTO SAVE
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ➕ ADD ORDER
  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  // ❌ CLEAR ALL ORDERS (🔥 NEW)
  const clearOrders = () => {
    setOrders([]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};