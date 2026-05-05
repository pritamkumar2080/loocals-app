import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  // ✅ SAFE LOAD
  const [cart, setCart] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));

      // 👉 agar old format (array) ho to reset
      if (Array.isArray(saved)) return {};

      return saved || {};
    } catch {
      return {};
    }
  });

  // ➕ ADD (FIXED SAFE)
  const addToCart = (product) => {
    setCart((prev) => {

      // 🔥 SAFE ARRAY CHECK (MAIN FIX)
      const shopItems = Array.isArray(prev[product.shopId])
        ? prev[product.shopId]
        : [];

      const exist = shopItems.find(
        (item) => item.id === product.id
      );

      let updatedShopItems;

      if (exist) {
        updatedShopItems = shopItems.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        updatedShopItems = [...shopItems, { ...product, qty: 1 }];
      }

      return {
        ...prev,
        [product.shopId]: updatedShopItems,
      };
    });
  };

  // ❌ REMOVE
  const removeFromCart = (shopId, id) => {
    setCart((prev) => {
      const shopItems = Array.isArray(prev[shopId]) ? prev[shopId] : [];

      const updatedShop = shopItems.filter(
        (item) => item.id !== id
      );

      const newCart = { ...prev };

      if (updatedShop.length === 0) {
        delete newCart[shopId];
      } else {
        newCart[shopId] = updatedShop;
      }

      return newCart;
    });
  };

  // ➕ INCREASE
  const increaseQty = (shopId, id) => {
    setCart((prev) => {
      const shopItems = Array.isArray(prev[shopId]) ? prev[shopId] : [];

      return {
        ...prev,
        [shopId]: shopItems.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };
    });
  };

  // ➖ DECREASE
  const decreaseQty = (shopId, id) => {
    setCart((prev) => {
      const shopItems = Array.isArray(prev[shopId]) ? prev[shopId] : [];

      const updated = shopItems
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

      const newCart = { ...prev };

      if (updated.length === 0) {
        delete newCart[shopId];
      } else {
        newCart[shopId] = updated;
      }

      return newCart;
    });
  };

  // 💾 SAVE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};