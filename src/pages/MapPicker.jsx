import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// MOVE MAP
const ChangeMapView = ({ center }) => {

  const map = useMap();

  map.setView(center, 15);

  return null;
};

const MapPicker = () => {

  const navigate = useNavigate();

  const [position, setPosition] = useState([28.6139, 77.2090]);

  // GET CURRENT LOCATION
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (location) => {

        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        setPosition([lat, lng]);
      },

      (error) => {
        console.log(error);
      },

      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }

    );

  }, []);

  // CONFIRM LOCATION
  const handleConfirmLocation = async () => {

    try {

      const response = await fetch(

        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`

      );

      const data = await response.json();

      const areaName =
        data.display_name;

      // SAVE AS OBJECT
      const addressData = {
        city: "Current Location",
        area: areaName,
        fullAddress: areaName,
        saveAs: "Home",
      };

      localStorage.setItem(
        "savedAddress",
        JSON.stringify(addressData)
      );

      navigate("/address");

    } catch (error) {

      console.log(error);

      alert("Unable to fetch location");

    }

  };

  return (
    <div className="h-screen w-full relative">

      {/* MAP */}
      <MapContainer
        center={position}
        zoom={15}
        className="h-full w-full"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} />

        <ChangeMapView center={position} />

      </MapContainer>

      {/* BUTTON */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-[1000]">

        <button
          onClick={handleConfirmLocation}
          className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg"
        >
          Confirm Location
        </button>

      </div>

    </div>
  );
};

export default MapPicker;