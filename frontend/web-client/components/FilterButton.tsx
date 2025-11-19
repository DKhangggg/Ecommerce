import { FilterIcon } from "lucide-react";
import React from "react";

interface FilterProps {
  onClick?: () => void;
  activeCount?: number;
}

const FilterButton = ({ onClick, activeCount = 0 }: FilterProps) => {
  const buttonStyle =
    activeCount > 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-black";
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded ${buttonStyle}`}
    >
      <span>
        <FilterIcon />
      </span>

      <span>Lọc</span>

      {activeCount > 0 && (
        <span className="bg-brand-5-500 text-white text-xs rounded-full px-2 py-0.5">
          {activeCount}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
