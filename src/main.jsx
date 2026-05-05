import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";
import { OrderProvider } from "./context/OrderContext"; // ✅ ADD
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AddressProvider>
          <OrderProvider>   {/* 🔥 ADD THIS */}
            <App />
          </OrderProvider>
        </AddressProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);