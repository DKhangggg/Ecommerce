"use client";
import FilterButton from "@/components/FilterButton";
import FilterModal from "@/components/FilterModal";
import ProductList from "@/components/Product/ProductList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useMemo, useEffect } from "react";
import { getShopProducts } from "@/lib/api";
import { Product } from "@/components/Product/ProductList";
import { ProductResponse } from "@/types/api";

const CategoryFilterOptions = [
  { value: "cat-1", label: "Quần áo & Thời trang", slug: "quan-ao-thoi-trang" },
  { value: "cat-2", label: "Giày dép", slug: "giay-dep" },
  { value: "cat-3", label: "Thiết bị Điện tử", slug: "thiet-bi-dien-tu" },
  {
    value: "cat-4",
    label: "Sách & Văn phòng phẩm",
    slug: "sach-van-phong-pham",
  },
  { value: "cat-9", label: "Trang sức & Phụ kiện", slug: "trang-suc-phu-kien" },
];

interface CategoryItemProps {
  category: { value: string; label: string; slug: string };
  selected: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

const CategoryFilterItem: React.FC<CategoryItemProps> = ({
  category,
  selected,
  onChange,
}) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={`category-${category.value}`}
      checked={selected.includes(category.value)}
      onChange={(e) => onChange(category.value, e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-amber-800 focus:ring-amber-800"
    />
    <Label
      htmlFor={`category-${category.value}`}
      className="font-normal cursor-pointer text-sm"
    >
      {category.label}
    </Label>
  </div>
);

function mapBackendProductToUI(p: ProductResponse): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price.toFixed(2),
    imageSrc: p.imageUrls?.[0] ?? "/placeholder.png",
    imageAlt: p.name,
    slug: p.slug ?? p.id,
  };
}

const ShopPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoriesMap = useMemo(() => {
    const mapById: Record<string, string> = {};
    const mapBySlug: Record<string, string> = {};
    CategoryFilterOptions.forEach((cat) => {
      mapById[cat.value] = cat.slug;
      mapBySlug[cat.slug] = cat.value;
    });
    return { mapById, mapBySlug };
  }, []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inputFilters, setInputFilters] = useState({
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";

    if (
      minPrice !== inputFilters.minPrice ||
      maxPrice !== inputFilters.maxPrice
    ) {
      setInputFilters({ minPrice, maxPrice });
    }

    const urlCategoriesSlugs = searchParams.get("category");
    if (urlCategoriesSlugs) {
      const slugs = urlCategoriesSlugs.split(",");
      const ids = slugs
        .map((slug) => categoriesMap.mapBySlug[slug])
        .filter((id) => id);
      setSelectedCategories(ids);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams, categoriesMap]);

  const handleInputChange = (field: "minPrice" | "maxPrice", value: string) => {
    setInputFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = useCallback(
    (value: string, isChecked: boolean) => {
      if (isChecked) {
        setSelectedCategories((prev) => [...prev, value]);
      } else {
        setSelectedCategories((prev) => prev.filter((c) => c !== value));
      }
    },
    []
  );

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (inputFilters.minPrice) params.set("minPrice", inputFilters.minPrice);
    else params.delete("minPrice");

    if (inputFilters.maxPrice) params.set("maxPrice", inputFilters.maxPrice);
    else params.delete("maxPrice");

    const selectedSlugs = selectedCategories
      .map((catId) => categoriesMap.mapById[catId])
      .filter((slug) => slug);

    if (selectedSlugs.length > 0) {
      params.set("category", selectedSlugs.join(","));
    } else {
      params.delete("category");
    }

    router.push(`/shop?${params.toString()}`);
    setIsFilterOpen(false);
  };

  // Tính Active Count
  const activeCount =
    (inputFilters.minPrice || inputFilters.maxPrice ? 1 : 0) +
    (selectedCategories.length > 0 ? 1 : 0);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(searchParams.toString());
        const backendProducts = await getShopProducts(params);
        setProducts(backendProducts.map(mapBackendProductToUI));
      } catch (e) {
        setError("Không tải được danh sách sản phẩm");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [searchParams]);

  return (
    <div>
      <div className="flex items-center justify-evenly gap-4 p-4">
        <div className="bg-white border border-amber-800 p-1 rounded-md w-[900px] flex items-center gap-2">
          <Input
            placeholder="Search..."
            className="border-none focus-visible:ring-0"
          />
          <button className="p-2">
            <Search className="w-5 h-5 text-amber-800" />
          </button>
        </div>

        <FilterButton
          onClick={() => setIsFilterOpen(true)}
          activeCount={activeCount}
        />
      </div>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApply}
      >
        <div className="space-y-6">
          {/* Lọc theo Giá */}
          <div>
            <Label className="font-bold mb-2 block">Khoảng giá (VNĐ)</Label>
            <div className="flex gap-3 items-center">
              <Input
                type="number"
                placeholder="Từ"
                value={inputFilters.minPrice}
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Đến"
                value={inputFilters.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          {/* Lọc theo Danh mục */}
          <div>
            <Label className="font-bold mb-3 block">Danh mục</Label>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {CategoryFilterOptions.map((category) => (
                <CategoryFilterItem
                  key={category.value}
                  category={category}
                  selected={selectedCategories}
                  onChange={handleCategoryToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </FilterModal>

      {loading && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          Đang tải sản phẩm...
        </div>
      )}

      {!loading && error && (
        <div className="p-4 text-center text-sm text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <ProductList title="Kết quả tìm kiếm" products={products} />
      )}
    </div>
  );
};

export default ShopPage;
