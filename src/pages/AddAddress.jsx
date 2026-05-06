import React, { useState } from "react";
import { ArrowLeft, MapPin, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {

  const navigate = useNavigate();

  const [addressType, setAddressType] = useState("myself");

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [saveAs, setSaveAs] = useState("");

  // SAVE ADDRESS
  const handleSave = () => {

    const addressData = {
      city,
      area,
      fullAddress,
      mapLink,
      addressType,
      receiverName,
      receiverPhone,
      saveAs,
    };

    localStorage.setItem(
      "savedAddress",
      JSON.stringify(addressData)
    );

    navigate("/address");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* TOP */}
      <div className="flex items-center gap-4 px-4 pt-5">

        <ArrowLeft
          size={24}
          className="cursor-pointer"
          onClick={() => navigate("/address")}
        />

        <h1 className="text-lg font-semibold">
          Add address details
        </h1>

      </div>

      {/* MAIN */}
      <div className="p-4 space-y-5">

        {/* ADDRESS DETAILS */}
        <div className="bg-white rounded-2xl p-4">

          <h2 className="font-semibold text-sm mb-4">
            Address details
          </h2>

          {/* CITY */}
          <div className="border rounded-2xl p-4 flex items-center justify-between mb-4">

            <div className="flex items-center gap-3">

              <div className="bg-gray-100 p-3 rounded-xl">
                <Building2 size={22} className="text-yellow-600" />
              </div>

              <input
                type="text"
                placeholder="Select a city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none"
              />

            </div>

            <span className="text-green-600 font-medium text-sm">
              Select
            </span>

          </div>

          {/* AREA */}
          <div className="border rounded-2xl p-4 flex items-center justify-between mb-4">

            <div className="flex items-center gap-3">

              <div className="bg-gray-100 p-3 rounded-xl">
                <MapPin size={22} className="text-yellow-600" />
              </div>

              <input
                type="text"
                placeholder="Select an area, street"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="outline-none"
              />

            </div>

            <span className="text-green-600 font-medium text-sm">
              Select
            </span>

          </div>

          {/* FULL ADDRESS */}
          <input
            type="text"
            placeholder="Enter complete address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full border rounded-xl p-4 outline-none mb-4"
          />

          {/* MAP LINK */}
          <input
            type="text"
            placeholder="Add google maps link (optional)"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            className="w-full border rounded-xl p-4 outline-none"
          />

        </div>

        {/* CONTACT DETAILS */}
        <div className="bg-white rounded-2xl p-4">

          <h2 className="font-semibold text-sm mb-4">
            Contact details
          </h2>

          {/* TOGGLE */}
          <div className="flex gap-8 mb-5">

            <label className="flex items-center gap-2">

                          <input
              type="radio"
              name="addressType"
              checked={addressType === "myself"}
              onChange={() => setAddressType("myself")}
            />

              Myself

            </label>

            <label className="flex items-center gap-2">

                              <input
                  type="radio"
                  name="addressType"
                  checked={addressType === "someone"}
                  onChange={() => setAddressType("someone")}
                />
              
              Someone else

            </label>

          </div>

          {addressType === "someone" && (
<>

{/* NAME */}
<input
  type="text"
  placeholder="Receiver's name"
  value={receiverName}
  onChange={(e) => setReceiverName(e.target.value)}
  className="w-full border rounded-xl p-4 outline-none mb-4"
/>

{/* PHONE */}
<input
  type="text"
  placeholder="Receiver's phone number"
  value={receiverPhone}
  onChange={(e) => setReceiverPhone(e.target.value)}
  className="w-full border rounded-xl p-4 outline-none mb-4"
/>

</>
)}


          {/* SAVE AS */}
          <input
            type="text"
            placeholder="Save as address (optional)"
            value={saveAs}
            onChange={(e) => setSaveAs(e.target.value)}
            className="w-full border rounded-xl p-4 outline-none"
          />

        </div>

      </div>

      {/* BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4">

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default AddAddress;