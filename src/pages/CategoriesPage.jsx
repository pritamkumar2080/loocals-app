import BackHeader from "../components/BackHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

// 🔥 IMPORT ALL IMAGES
import fruitsImg from "../assets/banana.avif";
import vegImg from "../assets/cabbage.avif";
import dairyImg from "../assets/milk.avif";
import snacksImg from "../assets/lays.avif";
import bevImg from "../assets/bread.avif";
import groceryImg from "../assets/detergent.avif";
import personalImg from "../assets/shampoo.avif";
import stationeryImg from "../assets/notebook.avif";
import Medicine from "../assets/Combiflam.avif";
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

  // SEARCH STATE
  const [search, setSearch] =
    useState("");

  // FILTER CATEGORIES
  const filteredCategories =
    categories.filter((cat) =>
      cat.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (

    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <BackHeader title="All Categories" />

      {/* SEARCH BAR */}
      <div className="my-4">

        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search categories..."
        />

      </div>

      {/* GRID */}
      {filteredCategories.length === 0 ? (

        <div className="bg-white rounded-3xl p-8 text-center">

          <p className="text-gray-500">
            No category found
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-4 gap-3">

          {filteredCategories.map(
            (cat, index) => (

              <div
                key={index}
                onClick={() =>
                  navigate(
                    `/category/${encodeURIComponent(
                      cat.name
                    )}`
                  )
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

            )
          )}

        </div>

      )}

    </div>

  );
};

export default CategoriesPage;