import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

const CategoryPreview = ({
  title,
  category,
   color,
}) => {

  const navigate = useNavigate();

  // FILTER PRODUCTS
  const filteredProducts = products
    .filter(
      (item) => item.category === category
    )
    .slice(0, 6);

  return (

   <div className={`${color} rounded-3xl p-4 mt-5 shadow-sm`}>

      {/* TOP */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold">
          {title}
        </h2>

        {/* ARROW */}
        <button
          onClick={() =>
            navigate(`/category/${category}`)
          }
          className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center"
        >
          →
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-3">

        {filteredProducts.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl p-2"
          >

            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-32 object-cover rounded-xl"
            />

            {/* NAME */}
            <p className="text-xs mt-2">
              {item.name}
            </p>

            {/* PRICE */}
            <p className="font-bold text-sm mt-1">
              ₹{item.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
};

export default CategoryPreview;