import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Grid, Truck, Tag, Headphones } from "lucide-react";

const BottomNavbar = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-2 text-xs">

      <Link to="/" onClick={() => setActive("home")} className={`flex flex-col items-center ${active === "home" ? "text-green-800" : ""}`}>
        <Home size={20}/> Home
      </Link>

      <Link to="/categories" onClick={() => setActive("categories")} className={`flex flex-col items-center ${active === "categories" ? "text-green-800" : ""}`}>
        <Grid size={20}/> Categories
      </Link>

      {/* 🔥 FIX HERE */}
      <Link to="/orders" onClick={() => setActive("orders")} className={`flex flex-col items-center ${active === "orders" ? "text-green-800" : ""}`}>
        <Truck size={20}/> Order
      </Link>

      <Link to="/offer" onClick={() => setActive("offer")} className={`flex flex-col items-center ${active === "offer" ? "text-green-800" : ""}`}>
        <Tag size={20}/> Offer
      </Link>

      <Link to="/help" onClick={() => setActive("help")} className={`flex flex-col items-center ${active === "help" ? "text-green-800" : ""}`}>
        <Headphones size={20}/> Help
      </Link>

    </div>
  );
};

export default BottomNavbar;