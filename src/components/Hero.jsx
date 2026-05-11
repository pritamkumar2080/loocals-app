import React, { useEffect, useState } from "react";

const Hero = () => {

  // ✅ SLIDES
  const slides = [
    {
      img: "/images/hero1.png",
      title: "Fresh Groceries \n Delivered to You",
      sub: "Best quality products at best prices",
      tag: "FRESH & HEALTHY",
    },

    {
      img: "/images/hero2.png",
      title: "Daily Essentials \n At Your Door",
      sub: "Fast delivery in minutes",
      tag: "FAST DELIVERY",
    },

    {
      img: "/images/hero3.png",
      title: "Snacks & Drinks \n Anytime",
      sub: "Enjoy your cravings",
      tag: "SNACK TIME",
    },

    {
      img: "/images/hero4.png",
      title: "Healthy Fruits \n & Vegetables",
      sub: "Fresh directly from farms",
      tag: "ORGANIC",
    },
  ];

  const [current, setCurrent] =
    useState(0);

  // AUTO SLIDE
  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrent(
          (prev) =>
            (prev + 1) %
            slides.length
        );

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <div className="w-full mt-3">

      {/* MAIN WRAPPER */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-sm">

        {/* SLIDER TRACK */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${
              current *
              (100 / slides.length)
            }%)`,
          }}
        >

          {slides.map(
            (item, index) => (

              <div
                key={index}
                className="relative flex-shrink-0"
                style={{
                  width: `${
                    100 /
                    slides.length
                  }%`,
                }}
              >

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt="hero"
                  className="w-full h-44 object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/25 flex items-center p-5">

                  <div className="text-white max-w-[65%]">

                    {/* TAG */}
                    <p className="text-[11px] font-semibold tracking-wide mb-1 opacity-90">

                      {item.tag}

                    </p>

                    {/* TITLE */}
                    <h2 className="text-xl font-bold leading-tight whitespace-pre-line">

                      {item.title}

                    </h2>

                    {/* SUBTITLE */}
                    <p className="text-xs mt-2 opacity-90 leading-relaxed">

                      {item.sub}

                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-3 gap-2">

        {slides.map((_, i) => (

          <div
            key={i}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-5 h-2 bg-green-600"
                : "w-2 h-2 bg-gray-300"
            }`}
          />

        ))}

      </div>

    </div>

  );
};

export default Hero;