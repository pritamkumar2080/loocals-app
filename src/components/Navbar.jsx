import React, { useState, useRef, useEffect } from 'react'
import {
  ShoppingCart, Mic, Loader, Search,
  UserCircle, BellRing, MapPin
} from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {

  const [listening, setListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("Detecting...");

  const recognitionRef = useRef(null)
  const navigate = useNavigate();

  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");
    if (savedCity) {
      setLocation(savedCity);
    }
  }, []);

  // 🎤 INIT
  const initRecognition = () => {
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition()
      recognition.lang = "en-IN"

      recognition.onstart = () => {
        setLoading(false)
        setListening(true)
      }

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;

        // 🔥 navigate with query
        navigate("/search", {
          state: { query: text }
        });
      }

      recognition.onend = () => {
        setListening(false)
        setLoading(false)
      }

      recognition.onerror = () => {
        setListening(false)
        setLoading(false)
      }

      recognitionRef.current = recognition
    }
  }

  const handleMicClick = (e) => {
    e.stopPropagation(); // 🔥 important (input click trigger na ho)

    initRecognition()

    if (!listening) {
      setLoading(true)
      recognitionRef.current.start()
    } else {
      recognitionRef.current.stop()
    }
  }

  const { cart } = useCart();

  const count = Object.values(cart).reduce((sum, shopItems) => {
    if (!Array.isArray(shopItems)) return sum;

    return sum + shopItems.reduce((s, item) => s + item.qty, 0);
  }, 0);

  return (
    <div className="w-full bg-gradient-to-b from-[#143D2A] via-[#1E4D36] to-[#2A6246] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">

        <div className="flex items-center justify-between gap-4">

          {/* LOGO + LOCATION */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <div className="text-xl font-bold text-white">
              Loocals
            </div>

            <div className="flex items-center text-xs text-green-100">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:block w-full max-w-md">
            <div
              onClick={() => navigate("/search")}
              className="flex items-center border rounded-full px-4 py-2 gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5 text-gray-500" />
              <span className="text-gray-400 flex-1">
                search products...
              </span>

              <button onClick={handleMicClick}>
                {loading ? (
                  <Loader className="animate-spin" />
                ) : listening ? (
                  <Mic className="text-red-700 animate-pulse" />
                ) : (
                  <Mic />
                )}
              </button>
            </div>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">

            <Link to="/notification" className="relative">
              <BellRing className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                1
              </span>
            </Link>

            <Link to="/cart" className="relative">
             <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 rounded-full">
                {count}
              </span>
            </Link>

            <Link to="/profile">
              <UserCircle className="w-6 h-6 text-white" />
            </Link>
          </div>

        </div>

        {/* MOBILE SEARCH */}
        <div className="mt-3 md:hidden">
          <div
            onClick={() => navigate("/search")}
            className="flex items-center border border-white/30 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 gap-2 cursor-pointer"
                >
            <Search className="w-5 h-5 text-white" />
            <span className="text-green-100 flex-1">
              search products...
            </span>

            <button onClick={handleMicClick}>
              {loading ? (
                <Loader className="animate-spin" />
              ) : listening ? (
                <Mic className="text-red-500 animate-pulse" />
              ) : (
                <Mic className="text-white" />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar;