import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-4">

      {/* BACK BUTTON */}
      <ArrowLeft
        onClick={() => navigate(-1)}
        className="cursor-pointer"
      />

      {/* TITLE */}
      <h2 className="text-lg font-bold">
        {title}
      </h2>

    </div>
  );
};

export default BackHeader;