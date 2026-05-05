import BackHeader from "../components/BackHeader";
import React from "react";
import {
  UserCircle, MapPin, ShoppingBag, Settings, Headphones, LogOut, Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 pb-20 flex justify-end">
      <BackHeader title="" />

      {/* ✅ RIGHT SIDE WRAPPER */}
      <div className="w-full md:w-[40%]">

        {/* HEADER */}
        <div className="bg-green-700 text-white p-5 rounded-b-2xl">
          <div className="flex items-center gap-4">
            <UserCircle className="w-16 h-16" />

            <div>
              <h2 className="text-lg font-semibold">Ankit Kumar</h2>
              <p className="text-sm">+91 XXXXXXXX</p>
              <p className="text-sm">Email-pritam@gmal.com</p>
            </div>

            <button
              onClick={() => navigate("/edit-profile")}
              className="ml-auto flex items-center gap-1 bg-white text-green-600 px-3 py-1 rounded-full text-sm"
            >
              <Edit size={14} /> Edit
            </button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="p-4 space-y-4">

          {/* ADDRESS */}
          <div
            onClick={() => navigate("/address")}
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin size={18} /> My Addresses
            </h3>

            <p className="text-sm text-gray-600">
              Delhi, India
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/add-address");
              }}
              className="mt-2 text-green-600 text-sm"
            >
              + Add New Address
            </button>
          </div>

          {/* ORDERS */}
          <div
            onClick={() => navigate("/orders")}
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ShoppingBag size={18} /> My Orders
            </h3>

            <div className="text-sm text-gray-600">
              <p>Order #1234 - Delivered</p>
              <p>Order #5678 - On the way</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/orders");
              }}
              className="mt-2 text-green-600 text-sm"
            >
              View All Orders
            </button>
          </div>

          {/* SETTINGS */}
          <div className="bg-white p-4 rounded-xl shadow space-y-3">

            <div
              onClick={() => navigate("/settings")}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <Settings size={18} />
              <span className="text-sm">Account Settings</span>
            </div>

            <div
              onClick={() => navigate("/help")}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
            >
              <Headphones size={18} />
              <span className="text-sm">Help & Support</span>
            </div>

          </div>

          {/* LOGOUT */}
          <div className="bg-white p-4 rounded-xl shadow">
            <button
              onClick={() => alert("Logged out")}
              className="flex items-center gap-2 text-red-600 font-medium"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;