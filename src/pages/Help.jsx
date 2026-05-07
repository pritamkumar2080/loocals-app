import BackHeader from "../components/BackHeader";
import React, { useState } from "react";

const Help = () => {

  // 🔥 OPEN FAQ
  const [openFaq, setOpenFaq] = useState(null);

  // 🔥 COPY STATE
  const [copied, setCopied] = useState(false);

  // 🔥 SUPPORT NUMBER
  const supportNumber = "+91 9876543210";

  // 🔥 COPY NUMBER
  const handleCopy = () => {

    navigator.clipboard.writeText(supportNumber);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  };

  return (
    <div className="p-4 pb-20 bg-gray-100 min-h-screen">

      <BackHeader title="Help" />

      <h2 className="text-lg font-bold mb-4">
        Help & Support
      </h2>

      {/* FAQ */}
      <div className="space-y-3">

        {/* ORDER */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">

          <button
            onClick={() =>
              setOpenFaq(
                openFaq === "order"
                  ? null
                  : "order"
              )
            }
            className="w-full text-left"
          >

            <p className="font-semibold text-sm">
              📦 Where is my order?
            </p>

          </button>

          {openFaq === "order" && (

            <div className="mt-3 text-xs text-gray-500 leading-6">

              <p>
                Your order can be tracked from
                the Orders section.
              </p>

              <p>
                Once the order is shipped,
                live tracking will appear.
              </p>

              <p>
                Delivery updates are shown
                automatically in the app.
              </p>

              <p>
                If your order is delayed,
                support will notify you.
              </p>

            </div>

          )}

        </div>

        {/* PAYMENT */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">

          <button
            onClick={() =>
              setOpenFaq(
                openFaq === "payment"
                  ? null
                  : "payment"
              )
            }
            className="w-full text-left"
          >

            <p className="font-semibold text-sm">
              💳 Payment failed?
            </p>

          </button>

          {openFaq === "payment" && (

            <div className="mt-3 text-xs text-gray-500 leading-6">

              <p>
                Payment may fail due to
                low balance or network issues.
              </p>

              <p>
                Please retry after checking
                your internet connection.
              </p>

              <p>
                You can also try another
                payment method.
              </p>

              <p>
                If money is deducted,
                refund is usually automatic.
              </p>

            </div>

          )}

        </div>

        {/* DELIVERY */}
        <div className="bg-white p-3 rounded-2xl shadow-sm">

          <button
            onClick={() =>
              setOpenFaq(
                openFaq === "delivery"
                  ? null
                  : "delivery"
              )
            }
            className="w-full text-left"
          >

            <p className="font-semibold text-sm">
              🚚 Delivery delay?
            </p>

          </button>

          {openFaq === "delivery" && (

            <div className="mt-3 text-xs text-gray-500 leading-6">

              <p>
                Delivery may be delayed due
                to weather or high demand.
              </p>

              <p>
                Our delivery partners try
                to deliver as fast as possible.
              </p>

              <p>
                You can check delivery status
                from your Orders page.
              </p>

              <p>
                We appreciate your patience
                and support.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* CONTACT */}
      <div className="mt-5 bg-green-50 p-4 rounded-2xl">

        <p className="font-semibold text-sm">
          Need more help?
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Contact us anytime
        </p>

        {/* NUMBER */}
        <div className="mt-3 bg-white rounded-xl p-3 flex justify-between items-center">

          <span className="font-semibold text-sm">
            {supportNumber}
          </span>

          <button
            onClick={handleCopy}
            className="text-green-600 text-sm font-semibold"
          >
            {copied ? "Copied" : "Copy"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Help;