import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { SearchProvider } from "./context/SearchContext";

import Navbar from "./components/Navbar";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ShopsPage from "./pages/ShopsPage";
import ShopDetail from "./pages/ShopDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import FloatingCart from "./components/FloatingCart";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Notification from "./pages/Notification";
import Orders from "./pages/Orders";
import Offer from "./pages/Offer";
import Help from "./pages/Help";
import SearchPage from "./pages/SearchPage";

// 🔥 IMPORTANT (DONO ALAG FILES HONGI)
import CategoryPage from "./pages/CategoryPage";       // 👉 products page
import CategoriesPage from "./pages/CategoriesPage";   // 👉 all categories page

const App = () => {
  const location = useLocation();

  // 📍 LOCATION SAVE
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        localStorage.setItem("userLat", position.coords.latitude);
        localStorage.setItem("userLng", position.coords.longitude);
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, []);

  const showNavbar = location.pathname === "/";

  return (
    <SearchProvider>

      {/* 🔝 TOP NAVBAR */}
      {showNavbar && <Navbar />}

      {/* 📄 ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/shop/:id" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/help" element={<Help />} />
        <Route path="/search" element={<SearchPage />} />

        {/* 🔥 CATEGORY FLOW */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>

      {/* 🔻 BOTTOM NAV + FLOATING CART */}
      <BottomNavbar />
      <FloatingCart />

    </SearchProvider>
  );
};

export default App;