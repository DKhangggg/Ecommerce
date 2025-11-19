import { MOCK_PRODUCTS } from "@/constants/product";
import ProductCard from "./ProductCard";
import Link from "next/link";

export interface Product {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  color?: string;
  href?: string;
  imageAlt?: string;
  slug?: string;
}

interface Props {
  title?: string;
  products?: Product[];
}

export default function ProductList({ title, products }: Props) {
  const productList = products || MOCK_PRODUCTS;

  return (
    <div className="w-full bg-white border border-(--brand-2) rounded-2xl p-4 mb-4 shadow-[0_6px_16px_rgba(0,0,0,0.06)]">
      {/* Tiêu đề */}
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <a
            href="#"
            className="text-brand-5 hover:text-brand-7 text-sm font-medium"
          >
            Xem tất cả
          </a>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productList.map((product) => (
          <Link
            href={`/product/${product.slug}`}
            key={product.id}
            className="hoverEffect"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
