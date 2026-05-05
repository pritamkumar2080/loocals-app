import React from "react";
import { useNavigate } from "react-router-dom";

// 🔥 IMPORT IMAGES
import fruitImg from "../assets/banana.avif";
import vegImg from "../assets/cabbage.avif";
import dairyImg from "../assets/milk.avif";
import snackImg from "../assets/lays.avif";
import beverageImg from "../assets/bread.avif";
import groceryImg from "../assets/detergent.avif";
import careImg from "../assets/shampoo.avif";
import stationaryImg from "../assets/notebook.avif";

// 🔥 CATEGORY DATA (UPDATED)
const categories = [
  { name: "Fruits", img: fruitImg },
  { name: "Vegetables", img: vegImg },
  { name: "Dairy", img: dairyImg },
  { name: "Snacks", img: snackImg },
  { name: "Beverages", img: beverageImg },
  { name: "Grocery", img: groceryImg },
  { name: "Personal Care", img: careImg },
  { name: "Stationery", img: stationaryImg },
];

const Categories = ({ limit }) => {
  const navigate = useNavigate();

  const data = limit ? categories : categories;

  return (
    <div className="mt-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-bold">Categories</h2>
      </div>

      {/* 🔥 CONDITIONAL UI */}
      {limit ? (
        // 👉 HOME (SCROLL)
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
          {data.map((cat, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/category/${encodeURIComponent(cat.name)}`)
              }
              className="min-w-[80px] bg-white p-3 rounded-xl shadow text-center cursor-pointer active:scale-95"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-10 h-10 mx-auto mb-2 object-contain"
              />
              <p className="text-[11px]">{cat.name}</p>
            </div>
          ))}
        </div>
      ) : (
        // 👉 FULL PAGE (GRID)
        <div className="grid grid-cols-4 gap-3">
          {data.map((cat, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/category/${encodeURIComponent(cat.name)}`)
              }
              className="bg-white p-3 rounded-xl shadow text-center cursor-pointer active:scale-95"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-10 h-10 mx-auto mb-2 object-contain"
              />
              <p className="text-[11px]">{cat.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;