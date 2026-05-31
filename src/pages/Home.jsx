import React from "react";

import Hero from "../components/Hero";
import ShopsNearby from "../components/ShopsNearby";
import Categories from "../components/Categories";
import RandomProducts from "../components/RandomProducts";
import Features from "../components/Features";
import OfferBanner from "../components/OfferBanner";
import CategoryPreview from "../components/CategoryPreview";
import SaleSection from "../components/SaleSection";

const Home = () => {
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">

      <div className="bg-gradient-to-b from-[#0F3D26] via-[#185234] to-[#1F6A43] pb-4">

  <Features />

  <Hero />

</div>

      {/* 🎁 OFFER BANNER */}
      <div className="px-4">
        <OfferBanner />
      </div>

      {/* 🏪 NEARBY SHOPS */}
      <ShopsNearby />

      <SaleSection />

      {/* 🗂 CATEGORIES */}
    <Categories limit={4} />

      {/* 🔥 CATEGORY PREVIEW */}
      <CategoryPreview
        title="Top Selection"
        category="Dairy"
        color="bg-[#C0E1D2]"
      />

       <CategoryPreview
        title="Beauty product"
       category="Beauty"
       color="bg-white"
       />

      <CategoryPreview
        title="Fresh Fruits"
        category="Fruits"
         color="bg-[#FF8383]"
      />

            <CategoryPreview
             title="Medicine"
              category="Medicine"
               color="bg-white"
              />

      <CategoryPreview
        title="Daily Essentials"
        category="Grocery"
         color="bg-[#FFA02E]"

      />          
        
      {/* 🛍 RANDOM PRODUCTS */}
      <RandomProducts />

    </div>
  );
};

export default Home;