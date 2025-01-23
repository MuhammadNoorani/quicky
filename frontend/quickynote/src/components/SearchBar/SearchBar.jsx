import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(e); // Call the parent component's onChange handler
    if (!newValue) {
      onClearSearch(); // Call the parent component's onClearSearch handler
    }
  };

  return (
    <div className="w-80 flex items-center px-4 bg-opacity-7 bg-[#121212] rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none text-white placeholder-slate-400"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-400 cursor-pointer hover:text-white mr-3"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-white"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
