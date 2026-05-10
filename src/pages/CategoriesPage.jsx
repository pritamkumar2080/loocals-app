import BackHeader from "../components/BackHeader";
import React from "react";
import { useNavigate } from "react-router-dom";

// 🔥 IMPORT ALL IMAGES
import fruitsImg from "../assets/banana.avif";
import vegImg from "../assets/cabbage.avif";
import dairyImg from "../assets/milk.avif";
import snacksImg from "../assets/lays.avif";
import bevImg from "../assets/bread.avif";
import groceryImg from "../assets/detergent.avif";
import personalImg from "../assets/shampoo.avif";
import stationeryImg from "../assets/notebook.avif";
import Medicine from "../assets/combiflam.avif";
import Beauty from "../assets/marslips.avif";

const categories = [
  { name: "Fruits", img: fruitsImg },
  { name: "Vegetables", img: vegImg },
  { name: "Dairy", img: dairyImg },
  { name: "Snacks", img: snacksImg },
  { name: "Beverages", img: bevImg },
  { name: "Grocery", img: groceryImg },
  { name: "Personal Care", img: personalImg },
  { name: "Stationery", img: stationeryImg },
  { name: "Medicine", img: Medicine },
  { name: "Beauty", img: Beauty },
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
       <BackHeader title="All Categories" />


      {/* GRID */}
      <div className="grid grid-cols-4 gap-3">

        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/category/${encodeURIComponent(cat.name)}`)
            }
            className="bg-white p-3 rounded-xl shadow-sm text-center cursor-pointer active:scale-95 hover:shadow-md transition"
          >

            {/* IMAGE */}
            <img
              src={cat.img}
              alt={cat.name}
              className="w-12 h-12 mx-auto mb-2 object-contain"
            />

            {/* NAME */}
            <p className="text-[12px] font-medium leading-tight">
              {cat.name}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default CategoriesPage;