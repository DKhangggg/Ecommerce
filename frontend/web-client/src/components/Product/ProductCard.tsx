// converted to Tailwind utilities — product.css no longer required
import type { Product } from "../../types/product";
import { Navigate, useNavigate } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { imageSrc, name, price, imageAlt } = product;
  const discount = product.id % 3 === 0 ? 25 : product.id % 2 === 0 ? 15 : 10;
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border border-[var(--brand-2)] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden w-[192px] grid [grid-template-rows:auto_1fr_auto] gap-2 p-2 transition-transform transition-shadow"
      role="article"
      aria-label={name}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-square rounded-[12px] overflow-hidden bg-[#fafafa]">
        <img
          className="w-full h-full object-cover block"
          src={imageSrc}
          alt={imageAlt ?? name}
        />
        <div className="absolute top-2 left-2 bg-[var(--brand-4)] text-white text-xs px-2 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
          -{discount}%
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-1">
        <div
          className="text-sm font-semibold text-[var(--text-on-brand)] leading-tight line-clamp-2"
          title={name}
        >
          {name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-red-600 font-extrabold">${price}</span>
          <span className="text-gray-400 text-xs line-through">
            ${Number(price) + 10}
          </span>
        </div>
      </div>
      <button
        className="m-1 border border-[var(--brand-4)] text-[var(--brand-4)] rounded-[10px] px-2 py-[6px] font-semibold bg-white hover:bg-[var(--brand-4)] hover:text-white"
        aria-label="Add to cart"
      >
        Thêm
      </button>
    </div>
  );
}
