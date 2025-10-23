import { useRef } from "react";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";
import "./product.css";

interface Props {
  title?: string;
  products: Product[];
  showViewAll?: boolean;
  onViewAllClick?: () => void;
}

export default function ProductList({
  title,
  products,
  showViewAll = true,
  onViewAllClick,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      className="w-full"
      style={{
        background: "#fff",
        border: "1px solid var(--brand-2)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
      }}
    >
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

        {/* Mobile/tablet: horizontal scroller */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-hide lg:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maxWidth: "100%",
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Desktop: centered responsive grid */}
        <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 place-items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
