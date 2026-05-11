import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  search,
  setSearch,
  placeholder = "Search products...",
}) => {

  return (

    <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">

      {/* ICON */}
      <Search
        size={20}
        className="text-gray-400"
      />

      {/* INPUT */}
      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder={placeholder}
        className="flex-1 outline-none text-sm bg-transparent"
      />

      {/* CLEAR BUTTON */}
      {search && (

        <button
          onClick={() => setSearch("")}
          className="text-gray-400 text-sm"
        >
          ✕
        </button>

      )}

    </div>

  );
};

export default SearchBar;