import BackHeader from "../components/BackHeader";
import React, { useState, useRef } from "react";
import { products } from "../data/products";
import { shops } from "../data/shops";
import { useNavigate, useLocation } from "react-router-dom";
import { Mic } from "lucide-react";

const SearchPage = () => {
  const location = useLocation();
  const [search, setSearch] = useState(location.state?.query || "");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // 🔍 STEP 1: matching products
  const matchedProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔥 STEP 2: unique shopIds
  const shopIds = [...new Set(matchedProducts.map(p => p.shopId))];

  // 🏪 STEP 3: shops filter
  const matchedShops = shops.filter(shop =>
    shopIds.includes(shop.id)
  );

  // 🎤 MIC FUNCTION (FULL FIXED)
  const handleMic = () => {
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();

      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }

        console.log("Voice:", text);
        setSearch(text);
      };

      recognition.onerror = (err) => {
        console.log("Mic error:", err);
        setListening(false);
        alert("Mic error 😢");
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  return (
    <div className="p-4">

      <BackHeader title="" />

      {/* 🔍 SEARCH INPUT + MIC */}
      <div className="flex items-center border rounded-full px-4 py-2 mb-4 gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none"
        />

        {/* 🎤 MIC BUTTON */}
        <button onClick={handleMic}>
          <Mic
            className={`w-5 h-5 ${
              listening ? "text-red-600 animate-pulse" : ""
            }`}
          />
        </button>
      </div>

      {/* 🏪 RESULT: SHOPS */}
      {matchedShops.length === 0 ? (
        <p className="text-gray-500">No shops found 😢</p>
      ) : (
        matchedShops.map((shop) => (
          <div
            key={shop.id}
            onClick={() => navigate(`/shop/${shop.id}`)}
            className="border p-3 rounded mb-3 cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-semibold text-lg">{shop.title}</h3>

            <p className="text-sm text-gray-500">
              Available items: {matchedProducts
                .filter(p => p.shopId === shop.id)
                .map(p => p.name)
                .join(", ")}
            </p>
          </div>
        ))
      )}

    </div>
  );
};

export default SearchPage;