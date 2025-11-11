import { useEffect, useRef, useState } from "react";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import { CircularIndeterminate } from "../common/Loading.tsx";

interface Props {
  title?: string;
  fetchFunction?: () => Promise<Product[]>;
  showViewAll?: boolean;
  onViewAllClick?: () => void;
}

export default function ProductList({
  title,
  fetchFunction = null,
  showViewAll = true,
  onViewAllClick,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        if (fetchFunction) {
          const data = await fetchFunction();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(`Lỗi khi tải ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [fetchFunction, title]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border border-[var(--brand-2)] rounded-[16px] p-4 mb-4 shadow-[0_6px_16px_rgba(0,0,0,0.06)]">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        <CircularIndeterminate />
        <p>Đang tải...</p>
      </div>
    );
  }

  const productCards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <div className="w-full bg-white border border-[var(--brand-2)] rounded-[16px] p-4 mb-4 shadow-[0_6px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        {showViewAll && (
          <button
            onClick={onViewAllClick}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
          >
            Xem tất cả
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="relative group/container overflow-hidden w-full">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 opacity-0 group-hover/container:opacity-100 transition-opacity duration-200 disabled:opacity-0"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide lg:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maxWidth: "100%",
          }}
        >
          {productCards}
        </div>

        {/* Desktop: centered responsive grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 place-items-stretch">
          {productCards}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 opacity-0 group-hover/container:opacity-100 transition-opacity duration-200 disabled:opacity-0"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
