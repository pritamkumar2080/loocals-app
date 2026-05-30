import React, { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { ref, update } from "firebase/database";

const EditProfile = () => {

  const navigate = useNavigate();

  const { user } = useAuth();

  // USER STATES
  const [name, setName] = useState("Ankit Kumar");
  const [mobile, setMobile] = useState("8877046530");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // UPDATE PROFILE

  const handleUpdate =
  async () => {

    try {

      await update(

        ref(
          db,
          `users/${user.uid}`
        ),

        {
          name,
          phone: mobile,
          email,
          profileImage,
        }
      );

      alert(
        "Profile Updated ✅"
      );

      navigate(
        "/profile"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed ❌"
      );
    }
  };
  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* TOP SECTION */}
      <div className="bg-red-500 h-52 rounded-b-[40px] relative">

        {/* BACK */}
        <ArrowLeft
          size={28}
          className="text-white absolute top-6 left-5 cursor-pointer"
          onClick={() => navigate("/profile")}
        />

        {/* TITLE */}
        <h1 className="text-white text-3xl font-bold absolute bottom-8 left-6">
          Edit Profile
        </h1>

      </div>

      {/* CARD */}
      <div className="px-5 -mt-14">

        <div className="bg-white rounded-[35px] p-6 shadow-lg">

          {/* PROFILE IMAGE */}
          <div className="flex justify-center">

            <div className="relative">

              <div className="w-32 h-32 rounded-full bg-red-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">

                {profileImage ? (

                  <img
                    src={profileImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <span className="text-5xl font-bold text-red-500">
                    A
                  </span>

                )}

              </div>

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profileImage"
              />

              {/* CAMERA BUTTON */}
              <label htmlFor="profileImage">

                <div className="absolute bottom-1 right-1 bg-red-500 p-2 rounded-full cursor-pointer">

                  <Camera size={18} className="text-white" />

                </div>

              </label>

            </div>

          </div>

          {/* INPUTS */}
          <div className="mt-10 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-red-500"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-red-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-2xl outline-none focus:border-red-500"
            />

            {/* UPDATE BUTTON */}
            <button
              onClick={handleUpdate}
              className="w-full bg-red-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-md mt-4"
            >
              Update Profile
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EditProfile;