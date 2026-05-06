import React from "react";
import {
  MapPin,
  ShoppingBag,
  Settings,
  Headphones,
  LogOut,
  ChevronRight,
  Pencil,
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
      <div className="w-full md:w-[40%] mx-auto pt-4 px-4">

        {/* TOP PROFILE SECTION */}
        <div className="bg-gradient-to-b from-red-500 to-yellow-200 rounded-[30px] pt-8 pb-8 shadow-sm">

          {/* PROFILE */}
          <div className="flex flex-col items-center">

            {/* PROFILE IMAGE */}
            <div className="relative">

              <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">

                {user.profileImage ? (

                  <img
                    src={user.profileImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <span className="text-5xl font-bold text-red-500">
                    A
                  </span>

                )}

              </div>

              {/* EDIT BUTTON */}
              <button
                onClick={() => navigate("/edit-profile")}
                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow"
              >
                <Pencil size={16} className="text-red-500" />
              </button>

            </div>

            {/* USER INFO */}
            <h2 className="mt-5 text-3xl font-bold text-black">
              {user.name}
            </h2>

            <p className="text-gray-700 text-sm mt-1">
              {user.mobile}
            </p>

            <p className="text-gray-600 text-sm">
              {user.email}
            </p>

          </div>
        </div>

        {/* ALL CARDS */}
        <div className="mt-6 space-y-5">

          {/* MY ADDRESS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

            <div
              onClick={() => navigate("/address")}
              className="flex items-center justify-between cursor-pointer"
            >

              <div className="flex items-center gap-3">

                <MapPin size={20} className="text-gray-600" />

                <div>
                  <h3 className="font-medium text-gray-800">
                    My Address
                  </h3>

                  <p className="text-xs text-gray-500">
                    Manage your saved addresses
                  </p>
                </div>

              </div>

              <ChevronRight size={18} className="text-gray-400" />

            </div>
          </div>

          {/* MY ORDERS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

            <div
              onClick={() => navigate("/orders")}
              className="flex items-center justify-between cursor-pointer"
            >

              <div className="flex items-center gap-3">

                <ShoppingBag size={20} className="text-gray-600" />

                <div>
                  <h3 className="font-medium text-gray-800">
                    My Orders
                  </h3>

                  <p className="text-xs text-gray-500">
                    Check your order history
                  </p>
                </div>

              </div>

              <ChevronRight size={18} className="text-gray-400" />

            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

            <h3 className="text-sm font-semibold text-gray-500 mb-5 uppercase">
              Account Settings
            </h3>

            <div
              onClick={() => navigate("/settings")}
              className="flex items-center justify-between cursor-pointer"
            >

              <div className="flex items-center gap-3">

                <Settings size={20} className="text-gray-600" />

                <div>
                  <h3 className="font-medium text-gray-800">
                    Account Settings
                  </h3>

                  <p className="text-xs text-gray-500">
                    Privacy, security & preferences
                  </p>
                </div>

              </div>

              <ChevronRight size={18} className="text-gray-400" />

            </div>

          </div>

          {/* HELP & SUPPORT */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

            <h3 className="text-sm font-semibold text-gray-500 mb-5 uppercase">
              Help & Support
            </h3>

            <div
              onClick={() => navigate("/help")}
              className="flex items-center justify-between cursor-pointer"
            >

              <div className="flex items-center gap-3">

                <Headphones size={20} className="text-gray-600" />

                <div>
                  <h3 className="font-medium text-gray-800">
                    Help & Support
                  </h3>

                  <p className="text-xs text-gray-500">
                    FAQs & customer support
                  </p>
                </div>

              </div>

              <ChevronRight size={18} className="text-gray-400" />

            </div>

          </div>

          {/* LOGOUT */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

            <button
              onClick={() => alert("Logged out")}
              className="flex items-center gap-3 text-red-500 font-semibold"
            >

              <LogOut size={20} />

              Logout

            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;