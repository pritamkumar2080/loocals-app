import React from "react";

import Hero from "../components/Hero";
import ShopsNearby from "../components/ShopsNearby";
import Categories from "../components/Categories";
import RandomProducts from "../components/RandomProducts";
import Features from "../components/Features";
import OfferBanner from "../components/OfferBanner";

const Home = () => {
  return (
    <div className="px-4 pb-16 bg-gray-50 min-h-screen">

      {/* ✨ FEATURES */}
      <Features />

      {/* 🔝 HERO */}
      <Hero />

      {/* 🎁 OFFER BANNER */}
      <div className="-mt-3">
        <OfferBanner />
      </div>

      {/* 🏪 NEARBY SHOPS */}
      <ShopsNearby />

      {/* 🗂 CATEGORIES */}
      <Categories limit={4} />

      {/* 🛍 RANDOM PRODUCTS */}
      <RandomProducts />

    </div>
  );
};

export default Home;