import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ CATEGORY DATA
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
];

const Categories = ({ limit }) => {

  const navigate = useNavigate();

  const data = limit
    ? categories
    : categories;

  return (

    <div className="mt-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">

        <h2 className="text-sm font-bold">

          Categories

        </h2>

      </div>

      {/* HOME SCROLL */}
      {limit ? (

        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">

          {data.map((cat, index) => (

            <div
              key={index}
              onClick={() =>
                navigate(
                  `/category/${encodeURIComponent(
                    cat.name
                  )}`
                )
              }
              className="min-w-[80px] bg-white p-3 rounded-2xl shadow-sm text-center cursor-pointer active:scale-95 hover:shadow-md transition duration-200"
            >

              {/* IMAGE */}
              <img
                src={cat.img}
                alt={cat.name}
                className="w-12 h-12 mx-auto mb-2 object-contain"
              />

              {/* NAME */}
              <p className="text-[11px] text-gray-700 font-medium">

                {cat.name}

              </p>

            </div>

          ))}

        </div>

      ) : (

        /* FULL PAGE GRID */
        <div className="grid grid-cols-4 gap-3">

          {data.map((cat, index) => (

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
                className="w-12 h-12 mx-auto mb-2 object-contain"
              />

              {/* NAME */}
              <p className="text-[11px] text-gray-700 font-medium">

                {cat.name}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default Categories;