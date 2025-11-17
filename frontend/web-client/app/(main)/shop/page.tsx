import ProductList from "@/components/Product/ProductList";
import { InputGroupInput } from "@/components/ui/input-group";
import { FilterIcon, Search } from "lucide-react";

const ShopPage = () => {
  return (
    <div>
      <div className="flex items-center justify-start gap-4 p-4">
        <div className="bg-white border border-amber-800 p-1 rounded-md w-[700px] flex items-center gap-2">
          <InputGroupInput placeholder="Search..." />
          <button>
            <Search />
          </button>
        </div>
        <div className="">
          <FilterIcon />
        </div>
      </div>

      <ProductList />
      <ProductList />
      <ProductList />
      <ProductList />
    </div>
  );
};

export default ShopPage;
