import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Hero = () => {

  const [current, setCurrent] = useState(0);

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

  return (
    <div className="w-full mt-3 px-2">

      {/* HERO SLIDER */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-black/20">

        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) =>
            setCurrent(swiper.realIndex)
          }
        >

          {slides.map((item, index) => (

            <SwiperSlide key={index}>

              <div className="relative">

                <img
                  src={item.img}
                  alt="hero"
                  className="w-full h-48 object-cover"
                />

                <div className="absolute inset-0 bg-black/25 flex items-center p-5">

                  <div className="text-white max-w-[65%]">

                    <p className="text-[11px] font-semibold tracking-wide mb-1 opacity-90">
                      {item.tag}
                    </p>

                    <h2 className="text-xl font-bold leading-tight whitespace-pre-line">
                      {item.title}
                    </h2>

                    <p className="text-xs mt-2 opacity-90 leading-relaxed">
                      {item.sub}
                    </p>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

      {/* CUSTOM DOTS */}
      <div className="flex justify-center mt-3 gap-2">

        {slides.map((_, i) => (

          <div
            key={i}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-5 h-2 bg-green-400"
                : "w-2 h-2 bg-gray-300"
            }`}
          />

        ))}

      </div>

    </div>
  );
};

export default Hero;