import BackHeader from "../components/BackHeader";
import React from "react";

const offers = [
  {
    id: 1,
    title: "50% OFF 🎉",
    desc: "Get 50% off on fresh fruits",
    code: "FRUIT50",
  },
  {
    id: 2,
    title: "Free Delivery 🚚",
    desc: "On orders above ₹199",
    code: "FREEDEL",
  },
  {
    id: 3,
    title: "₹100 OFF 💸",
    desc: "On first order",
    code: "WELCOME100",
  },
];

const Offer = () => {
  return (
    <div className="p-4 pb-20">
      <BackHeader title="" />

      <h2 className="text-lg font-bold mb-4">
        Offers & Deals
      </h2>

      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-600"
          >
            <p className="font-semibold text-sm">
              {offer.title}
            </p>

            <p className="text-xs text-gray-500">
              {offer.desc}
            </p>

            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {offer.code}
              </span>

              <button className="text-green-600 text-xs font-semibold">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Offer;