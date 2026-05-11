import BackHeader from "../components/BackHeader";

import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../firebase";

import { shops } from "../data/shops";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { Mic } from "lucide-react";

const SearchPage = () => {

  const location =
    useLocation();

  const [search, setSearch] =
    useState(
      location.state?.query ||
        ""
    );

  const [listening, setListening] =
    useState(false);

  // PRODUCTS
  const [products, setProducts] =
    useState([]);

  // FETCH PRODUCTS
  useEffect(() => {

    const productsRef = ref(
      db,
      "products"
    );

    onValue(productsRef, (snapshot) => {

      const data = snapshot.val();

      if (data) {

        // OBJECT → ARRAY
        const productArray =
          Object.values(data);

        // ✅ FIX IMAGE PATH
        const fixedProducts =
          productArray.map((item) => {

            // FILE NAME
            const fileName =
              item.img
                ?.split("/")
                .pop();

            return {

              ...item,

              // NEW IMAGE PATH
              img: `/images/${fileName}`,

            };

          });

        setProducts(fixedProducts);

      }

    });

  }, []);

  const recognitionRef =
    useRef(null);

  const navigate =
    useNavigate();

  // MATCH PRODUCTS
  const matchedProducts =
    products.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  // UNIQUE SHOP IDS
  const shopIds = [
    ...new Set(
      matchedProducts.map(
        (p) => p.shopId
      )
    ),
  ];

  // MATCHED SHOPS
  const matchedShops =
    shops.filter((shop) =>
      shopIds.includes(shop.id)
    );

  // MIC FUNCTION
  const handleMic = () => {

    if (
      !recognitionRef.current
    ) {

      const recognition =
        new window.webkitSpeechRecognition();

      recognition.lang =
        "en-IN";

      recognition.continuous =
        false;

      recognition.interimResults =
        false;

      recognition.onstart =
        () => {

          setListening(true);

        };

      recognition.onresult = (
        event
      ) => {

        let text = "";

        for (
          let i = 0;
          i <
          event.results.length;
          i++
        ) {

          text +=
            event.results[i][0]
              .transcript;

        }

        console.log(
          "Voice:",
          text
        );

        setSearch(text);

      };

      recognition.onerror = (
        err
      ) => {

        console.log(
          "Mic error:",
          err
        );

        setListening(false);

        alert(
          "Mic error 😢"
        );

      };

      recognition.onend =
        () => {

          setListening(false);

        };

      recognitionRef.current =
        recognition;

    }

    recognitionRef.current.start();

  };

  return (

    <div className="p-4 pb-20 bg-gray-50 min-h-screen">

      <BackHeader title="" />

      {/* SEARCH */}
      <div className="flex items-center bg-white border rounded-full px-4 py-3 mb-5 gap-2 shadow-sm">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="flex-1 outline-none text-sm"
        />

        {/* MIC */}
        <button
          onClick={
            handleMic
          }
        >

          <Mic
            className={`w-5 h-5 ${
              listening
                ? "text-red-600 animate-pulse"
                : "text-gray-500"
            }`}
          />

        </button>

      </div>

      {/* RESULTS */}
      {matchedShops.length ===
      0 ? (

        <div className="bg-white rounded-3xl p-8 text-center shadow-sm">

          <p className="text-gray-500">

            No shops found 😢

          </p>

        </div>

      ) : (

        matchedShops.map(
          (shop) => (

            <div
              key={shop.id}
              onClick={() =>
                navigate(
                  `/shop/${shop.id}`
                )
              }
              className="bg-white p-4 rounded-3xl mb-4 shadow-sm cursor-pointer active:scale-[0.98] transition"
            >

              {/* SHOP NAME */}
              <h3 className="font-bold text-lg">

                {shop.title}

              </h3>

              {/* INFO */}
              <p className="text-xs text-gray-500 mt-1">

                ⭐ {shop.rating}
                {" • "}
                ⏱ {shop.time}

              </p>

              {/* PRODUCTS */}
              <div className="mt-3 flex flex-wrap gap-2">

                {matchedProducts
                  .filter(
                    (p) =>
                      p.shopId ===
                      shop.id
                  )
                  .slice(0, 5)
                  .map((p) => (

                    <span
                      key={p.id}
                      className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full"
                    >

                      {p.name}

                    </span>

                  ))}

              </div>

            </div>

          )
        )

      )}

    </div>

  );

};

export default SearchPage;