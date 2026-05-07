import BackHeader from "../components/BackHeader";
import React, { useState } from "react";

const offers = [
  {
    id: 1,
    title: "50% OFF 🎉",
    desc: "Get 50% off on fresh fruits",
    code: "SAVE20",
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

  // 🔥 COPIED STATE
  const [copiedId, setCopiedId] = useState(null);

  // 🔥 COPY FUNCTION
  const handleCopy = (code, id) => {

    navigator.clipboard.writeText(code);

    setCopiedId(id);

    // AUTO RESET
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);

  };

  return (
    <div className="p-4 pb-20">

      <BackHeader title="Offers & Deals" />


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

              {/* COPY BUTTON */}
              <button
                onClick={() =>
                  handleCopy(offer.code, offer.id)
                }
                className="text-green-600 text-xs font-semibold"
              >
                {copiedId === offer.id
                  ? "Copied"
                  : "Copy"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Offer;