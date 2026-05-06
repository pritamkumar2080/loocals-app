import React from "react";
import {
  ArrowLeft,
  Search,
  LocateFixed,
  Plus,
  Home,
  MoreVertical,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Address = () => {

  const navigate = useNavigate();

  // GET SAVED ADDRESS
  const savedAddress = JSON.parse(
  localStorage.getItem("savedAddress")
);
  

  return (
    <div className="min-h-screen bg-[#035c16]">

      {/* TOP HEADER */}
      <div className="flex items-center gap-4 px-4 pt-5 text-white">

        <ArrowLeft
          size={24}
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        <h1 className="font-bold text-sm tracking-wide">
          SELECT DELIVERY LOCATION
        </h1>

      </div>

      {/* WHITE CONTAINER */}
      <div className="bg-[#f7f7f7] rounded-t-[20px] mt-6 min-h-screen p-4">

        {/* SEARCH BOX */}
        <div className="bg-white rounded-md border border-gray-200 flex items-center px-3 py-3">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search for location"
            className="ml-3 outline-none bg-transparent text-sm w-full"
          />

        </div>

        {/* CURRENT LOCATION */}
        <div
          onClick={() => navigate("/map-picker")}
          className="bg-white rounded-md border border-gray-200 flex items-center justify-center gap-2 py-4 mt-3 cursor-pointer"
        >

          <LocateFixed size={18} className="text-green-600" />

          <span className="text-green-600 font-semibold text-sm">
            Use current location
          </span>

        </div>

        {/* SAVED ADDRESS */}
        <div className="flex items-center justify-between mt-6">

          <h2 className="text-gray-500 text-sm font-semibold">
            Saved addresses
          </h2>

          <button
            onClick={() => navigate("/add-address")}
            className="bg-[#d9f2e2] text-green-700 px-4 py-2 rounded-md flex items-center gap-1 text-sm font-semibold"
          >

            <Plus size={16} />

            ADD NEW ADDRESS

          </button>

        </div>

        {/* ADDRESS CARD */}
        <div className="bg-white border border-green-600 rounded-md p-4 mt-4">

          <div className="flex justify-between">

            {/* LEFT */}
            <div className="flex gap-3">

              {/* ICON */}
              <div className="bg-[#e8f7ee] p-2 rounded-md h-fit">

                <Home size={18} className="text-green-600" />

              </div>

              {/* TEXT */}
              <div>

                <div className="flex items-center gap-2">

                  <h3 className="font-bold text-sm">
                    {savedAddress?.saveAs || "Home"}
                  </h3>

                  <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-[2px] rounded">
                    SELECTED
                  </span>

                </div>

                <p className="text-gray-500 text-sm mt-1 leading-5">
                  {savedAddress ? (
                      <>
                        {savedAddress.fullAddress}
                        <br />
                        {savedAddress.area}, {savedAddress.city}
                      </>
                    ) : (
                      "No address added"
                    )}
                </p>

              </div>

            </div>

            {/* RIGHT */}
            <MoreVertical
              size={18}
              className="text-gray-500"
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Address;