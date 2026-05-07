import React from "react";
import {
  MapPin,
  ShoppingBag,
  Settings,
  Headphones,
  LogOut,
  ChevronRight,
  Pencil,
  Mail,
  Phone,
  Heart,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  // GET USER DATA
  const user =
    JSON.parse(localStorage.getItem("user")) || {
      name: "Ankit Kumar",
      mobile: "8877046530",
      email: "ankit@gmail.com",
      profileImage: "",
    };

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-24">

      {/* MAIN WRAPPER */}
      <div className="w-full md:w-[40%] mx-auto px-4 pt-4">

        {/* TOP CARD */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm">

          {/* TOP GREEN AREA */}
          <div className="h-[140px] bg-gradient-to-br from-[#b8e6b9] via-[#dff5df] to-[#a8dca9] relative">

            {/* CIRCLE BG */}
            <div className="absolute w-44 h-44 bg-white/10 rounded-full top-[-40px] left-[-20px]" />

            <div className="absolute w-32 h-32 bg-white/10 rounded-full top-4 right-[-20px]" />

            {/* DOTS */}
            <div className="absolute top-6 left-6 flex gap-1">

              <span className="w-2 h-2 rounded-full bg-white/50" />
              <span className="w-2 h-2 rounded-full bg-white/50" />
              <span className="w-2 h-2 rounded-full bg-white/50" />

            </div>

          </div>

          {/* PROFILE IMAGE */}
          <div className="relative flex justify-center">

            <div className="-mt-16 relative">

              <div className="w-32 h-32 rounded-full border-[5px] border-white overflow-hidden shadow-md bg-white">

                {user.profileImage ? (

                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-green-600">
                    A
                  </div>

                )}

              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() => navigate("/edit-profile")}
                className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >

                <Pencil
                  size={16}
                  className="text-green-600"
                />

              </button>

            </div>

          </div>

          {/* USER INFO */}
          <div className="px-5 pb-6 pt-4 text-center">

            <h2 className="text-4xl font-bold text-[#0f172a]">
              {user.name}
            </h2>

            {/* PHONE */}
            <div className="mt-4 inline-flex items-center gap-2 bg-[#eef8ef] border border-[#dcefdc] px-4 py-2 rounded-2xl">

              <Phone
                size={16}
                className="text-green-600"
              />

              <p className="text-lg text-[#1e293b]">
                {user.mobile}
              </p>

            </div>

            {/* EMAIL */}
            <div className="mt-3 inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">

              <Mail
                size={16}
                className="text-green-600"
              />

              <p className="text-sm text-[#1e293b]">
                {user.email}
              </p>

            </div>

          </div>

        </div>

        {/* SETTINGS SECTION */}
        <div className="mt-5 space-y-3">

          {/* MY ORDERS */}
          <div
            onClick={() => navigate("/orders")}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >

            <div className="flex items-center gap-3">

              <ShoppingBag
                size={20}
                className="text-green-600"
              />

              <div>

                <h3 className="font-semibold text-sm text-gray-800">
                  My Orders
                </h3>

                <p className="text-[11px] text-gray-500">
                  View your order history
                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="text-gray-400"
            />

          </div>

          {/* WISHLIST */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer">

            <div className="flex items-center gap-3">

              <Heart
                size={20}
                className="text-pink-500"
              />

              <div>

                <h3 className="font-semibold text-sm text-gray-800">
                  Wishlist
                </h3>

                <p className="text-[11px] text-gray-500">
                  Your favorite items
                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="text-gray-400"
            />

          </div>

          {/* ADDRESS */}
          <div
            onClick={() => navigate("/address")}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >

            <div className="flex items-center gap-3">

              <MapPin
                size={20}
                className="text-green-600"
              />

              <div>

                <h3 className="font-semibold text-sm text-gray-800">
                  My Address
                </h3>

                <p className="text-[11px] text-gray-500">
                  Manage saved address
                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="text-gray-400"
            />

          </div>

          {/* SETTINGS */}
          <div
            onClick={() => navigate("/settings")}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >

            <div className="flex items-center gap-3">

              <Settings
                size={20}
                className="text-green-600"
              />

              <div>

                <h3 className="font-semibold text-sm text-gray-800">
                  Account Settings
                </h3>

                <p className="text-[11px] text-gray-500">
                  Privacy & preferences
                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="text-gray-400"
            />

          </div>

          {/* HELP */}
          <div
            onClick={() => navigate("/help")}
            className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >

            <div className="flex items-center gap-3">

              <Headphones
                size={20}
                className="text-green-600"
              />

              <div>

                <h3 className="font-semibold text-sm text-gray-800">
                  Help & Support
                </h3>

                <p className="text-[11px] text-gray-500">
                  FAQs & support
                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="text-gray-400"
            />

          </div>

          {/* LOGOUT */}
          <button
            onClick={() => alert("Logged out")}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-red-500 font-semibold"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;