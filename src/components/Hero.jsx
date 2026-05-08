import React, { useEffect, useState } from "react";

import hero1 from "../assets/hero2.png";
import hero2 from "../assets/hero1.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";

const Hero = () => {

  const slides = [
    {
      img: hero1,
      title: "Fresh Groceries \n Delivered to You",
      sub: "Best quality products at best prices",
      tag: "FRESH & HEALTHY"
    },
    {
      img: hero2,
      title: "Daily Essentials \n At Your Door",
      sub: "Fast delivery in minutes",
      tag: "FAST DELIVERY"
    },
    {
      img: hero3,
      title: "Snacks & Drinks \n Anytime",
      sub: "Enjoy your cravings",
      tag: "SNACK TIME"
    },
    {
      img: hero4,
      title: "Healthy Fruits \n & Vegetables",
      sub: "Fresh directly from farms",
      tag: "ORGANIC"
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-3">

      {/* 🔥 MAIN WRAPPER */}
      <div className="relative w-full overflow-hidden rounded-xl">

        {/* 🔥 SLIDER TRACK */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >

          {slides.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0"
              style={{ width: `${100 / slides.length}%` }}
            >

              {/* IMAGE */}
              <img
                src={item.img}
                alt="hero"
                className="w-full h-40 object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/20 flex items-center p-4">
                <div className="text-white max-w-[60%]">
                  <p className="text-xs font-semibold mb-1">
                    {item.tag}
                  </p>

                  <h2 className="text-lg font-bold leading-tight whitespace-pre-line">
                    {item.title}
                  </h2>

                  <p className="text-xs mt-1 opacity-90">
                    {item.sub}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-2 gap-1">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === current ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;