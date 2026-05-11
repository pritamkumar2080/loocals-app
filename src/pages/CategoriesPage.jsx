import BackHeader from "../components/BackHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

// ✅ PUBLIC IMAGES PATH
const categories = [
  {
    name: "Fruits",
    img: "/images/banana.avif",
  },

  {
    name: "Vegetables",
    img: "/images/cabbage.avif",
  },

  {
    name: "Dairy",
    img: "/images/milk.avif",
  },

  {
    name: "Snacks",
    img: "/images/lays.avif",
  },

  {
    name: "Beverages",
    img: "/images/bread.avif",
  },

  {
    name: "Grocery",
    img: "/images/detergent.avif",
  },

  {
    name: "Personal Care",
    img: "/images/shampoo.avif",
  },

  {
    name: "Stationery",
    img: "/images/notebook.avif",
  },

  {
    name: "Medicine",
    img: "/images/Combiflam.avif",
  },

  {
    name: "Beauty",
    img: "/images/marslips.avif",
  },
];

const CategoriesPage = () => {

  const navigate = useNavigate();

  // SEARCH STATE
  const [search, setSearch] =
    useState("");

  // FILTER CATEGORY
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

      {/* SEARCH */}
      <div className="my-4">

        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Search categories..."
        />

      </div>

      {/* EMPTY */}
      {filteredCategories.length === 0 ? (

        <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

          <p className="text-gray-500 text-sm">
            No category found
          </p>

        </div>

      ) : (

        /* GRID */
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
                className="bg-white p-3 rounded-2xl shadow-sm text-center cursor-pointer active:scale-95 hover:shadow-md transition duration-200"
              >

                {/* IMAGE */}
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-14 h-14 mx-auto mb-2 object-contain"
                />

                {/* NAME */}
                <p className="text-[12px] font-medium leading-tight text-gray-700">

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