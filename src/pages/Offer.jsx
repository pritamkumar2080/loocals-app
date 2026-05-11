import React, { useState } from "react";
import BackHeader from "../components/BackHeader";
import { coupons } from "../data/coupons";

const Offer = () => {

  // COPY STATE
  const [copiedId, setCopiedId] = useState(null);

  // COPY FUNCTION
  const handleCopy = (code, id) => {

    navigator.clipboard.writeText(code);

    setCopiedId(id);

    setTimeout(() => {

      setCopiedId(null);

    }, 2000);

  };

  return (

    <div className="bg-gray-100 min-h-screen p-4 pb-24">

      {/* HEADER */}
      <BackHeader title="Offers & Deals" />

      {/* OFFERS */}
      <div className="space-y-4 mt-4">

        {coupons.map((offer) => (

          <div
            key={offer.id}
            className="bg-white rounded-3xl p-4 shadow-sm border-l-4 border-green-600"
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              <div>

                <h2 className="font-bold text-lg">

                  {offer.title}

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                  {offer.desc}

                </p>

              </div>

              {/* COPY BUTTON */}
              <button
                onClick={() =>
                  handleCopy(
                    offer.code,
                    offer.id
                  )
                }
                className="text-green-600 text-sm font-bold"
              >

                {copiedId === offer.id
                  ? "Copied"
                  : "Copy"}

              </button>

            </div>

            {/* COUPON CODE */}
            <div className="mt-4">

              <span className="bg-gray-100 text-gray-700 px-3 py-2 rounded-xl text-sm font-semibold">

                {offer.code}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default Offer;