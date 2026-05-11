import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "../components/BackHeader";
import { coupons } from "../data/coupons";

const CouponsPage = () => {

  const navigate = useNavigate();

  const [couponInput, setCouponInput] =
    useState("");

  // APPLY COUPON
  const applyCoupon = (coupon) => {

    // CART TOTAL
    const cartTotal =
      Number(
        localStorage.getItem(
          "cartTotal"
        )
      ) || 0;

    // MINIMUM CHECK
    if (
      cartTotal < coupon.minAmount
    ) {

      alert(
        `Minimum order should be ₹${coupon.minAmount}`
      );

      return;
    }

    // SAVE COUPON
    localStorage.setItem(
      "appliedCoupon",
      JSON.stringify(coupon)
    );

    // REDIRECT
    navigate("/checkout");
  };

  // MANUAL APPLY
  const handleManualApply = () => {

    const foundCoupon =
      coupons.find(
        (c) =>
          c.code.toLowerCase() ===
          couponInput.toLowerCase()
      );

    if (foundCoupon) {

      applyCoupon(foundCoupon);

    } else {

      alert("Invalid Coupon");

    }
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="sticky top-0 bg-white z-20 p-4 shadow-sm">

        <BackHeader title="Coupons" />

      </div>

      <div className="p-4">

        {/* INPUT BOX */}
        <div className="bg-white p-3 rounded-2xl flex gap-2 mb-4">

          <input
            type="text"
            placeholder="Type coupon code here"
            value={couponInput}
            onChange={(e) =>
              setCouponInput(
                e.target.value
              )
            }
            className="flex-1 outline-none"
          />

          <button
            onClick={
              handleManualApply
            }
            className="bg-gray-300 px-4 rounded-xl font-semibold"
          >
            Apply
          </button>

        </div>

        {/* COUPONS */}
        <div className="space-y-4">

          {coupons.map(
            (coupon) => (

              <div
                key={coupon.id}
                className="bg-white rounded-3xl p-4 shadow-sm"
              >

                <div className="flex justify-between gap-3">

                  <div>

                    <h2 className="font-bold text-lg">

                      {coupon.title}

                    </h2>

                    <p className="text-gray-500 text-sm mt-1">

                      {coupon.desc}

                    </p>

                    <p className="text-xs text-gray-400 mt-2">

                      Minimum order ₹
                      {
                        coupon.minAmount
                      }

                    </p>

                  </div>

                  {/* APPLY BUTTON */}
                  <button
                    onClick={() =>
                      applyCoupon(
                        coupon
                      )
                    }
                    className="bg-green-600 text-white px-4 h-10 rounded-xl font-semibold"
                  >

                    Apply

                  </button>

                </div>

                {/* COPY BUTTON */}
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      coupon.code
                    )
                  }
                  className="mt-4 text-green-600 text-sm font-semibold"
                >

                  Copy Code :
                  {" "}
                  {coupon.code}

                </button>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default CouponsPage;