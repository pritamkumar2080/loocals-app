
import React from "react";

import Hero from "../components/Hero";
import ShopsNearby from "../components/ShopsNearby";
import Categories from "../components/Categories";
import RandomProducts from "../components/RandomProducts";

const Home = () => {
  return (
    <div className="px-4 pb-16">
     

      {/* 🔝 HERO */}
      <Hero />

      {/* 🏪 NEARBY SHOPS */}
      <ShopsNearby />

      {/* 🗂 CATEGORIES */}
      <Categories limit={4} />  {/* 🔥 CHANGE HERE */}

      {/* 🛍 RANDOM PRODUCTS */}
      <RandomProducts />

    </div>
  );
};

export default Home;