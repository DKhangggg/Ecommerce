"use client";
import FilterButton from "@/components/FilterButton";
import ProductList from "@/components/Product/ProductList";
import { InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useState } from "react";

const ShopPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-evenly gap-4 p-4">
        <div className="bg-white border border-amber-800 p-1 rounded-md w-[900px] flex items-center gap-2">
          <InputGroupInput placeholder="Search..." />
          <button>
            <Search />
          </button>
        </div>

        <FilterButton
          isOpen={isFilterOpen}
          onClick={() => setIsFilterOpen(true)}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>

      <ProductList />
      <ProductList />
      <ProductList />
      <ProductList />
    </div>
  );
};

export default ShopPage;
