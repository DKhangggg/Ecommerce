import { FilterIcon } from "lucide-react";
import React from "react";

interface FilterProps {
  onClick?: () => void;
  activeCount?: number;
}

const FilterButton = ({ onClick, activeCount = 0 }: FilterProps) => {
  const buttonStyle =
    activeCount > 0 ? "bg-brand-6 text-white" : "bg-brand-6/50 text-black";

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded ${buttonStyle} relative`}
    >
      <span className="shrink-0">
        <FilterIcon className="w-5 h-5" />
      </span>

      <span>Lọc</span>

      {activeCount > 0 && (
        <span
          className="
            absolute top-0 right-0 
            bg-white text-brand-6 text-xs 
            rounded-full px-1.5 py-0.5
            transform translate-x-1/2 -translate-y-1/2
            flex items-center justify-center
            min-w-5 h-5 
            border border-brand-6 font-bold z-10
          "
        >
          {activeCount}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
