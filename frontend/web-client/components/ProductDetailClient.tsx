// components/ProductDetailClient.tsx
"use client";

import { useState, useCallback } from "react";
import QuantitySelector from "./QuantitySelector";
import VariantSelector from "./VariantSelector";
import { Product } from "./Product/ProductList";

// Thêm lại interface Variant để code TS không bị lỗi
interface Variant {
  id: string;
  stock: number;
  price: number;
  [key: string]: unknown;
}

interface ProductDetailClientProps {
  product: Product;
    stockQuantity: number;
    stockStatus: string;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  // State quản lý Variant và Quantity
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const options = product.options || [];
  const variants = product.variants || [];
  const basePrice = parseFloat(product.price.toString());
  const variantPrice = selectedVariant
    ? parseFloat(selectedVariant.price.toString())
    : undefined;

  const currentPrice = variantPrice ?? basePrice;

  const finalPrice = isNaN(currentPrice) ? 0 : currentPrice;
  const currentStock = selectedVariant?.stock ?? (product.variants ? 0 : 9999);
  const isAvailable = currentStock > 0;
  const shouldShowVariantSelector = options.length > 0;
  const handleVariantChange = useCallback((variant: Variant | null) => {
    setSelectedVariant(variant);
    // Khi variant đổi, reset quantity về 1
    setQuantity(1);
  }, []);

  const handleAddToCart = () => {
    if (isAvailable && quantity > 0) {
      console.log(
        `Đã thêm ${quantity} x ${product.name} (${selectedVariant?.id}) vào giỏ hàng.`
      );
      // Logic gọi API thêm vào giỏ hàng ở đây
    } else {
      alert("Sản phẩm đã hết hàng hoặc số lượng không hợp lệ.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. HIỂN THỊ GIÁ ĐỘNG */}
      <span className="text-3xl text-brand-7 font-semibold">
        ${finalPrice.toFixed(2)}
      </span>

      <p className="text-gray-600">Đây là mô tả chi tiết của sản phẩm.</p>

      {/* 2. VARIANT SELECTOR */}
      {shouldShowVariantSelector && (
        <VariantSelector
          options={options}
          variants={variants}
          onChange={handleVariantChange}
        />
      )}

      {/* 3. HIỂN THỊ TRẠNG THÁI STOCK */}
      <p
        className={`font-medium ${
          isAvailable ? "text-green-600" : "text-red-600"
        }`}
      >
        {isAvailable ? `Còn hàng (${currentStock} sản phẩm)` : "Đã hết hàng"}
      </p>

      {/* 4. QUANTITY & BUTTONS */}
      <div className="flex items-center gap-4 pt-2">
        <QuantitySelector
          min={1}
          max={currentStock}
          onChange={setQuantity}
          initialQuantity={quantity}
        />

        <button
          onClick={handleAddToCart}
          disabled={!isAvailable || quantity === 0}
          className={`px-6 py-3 rounded-lg text-lg font-semibold transition-colors w-full md:w-auto
            ${
              isAvailable && quantity > 0
                ? "bg-brand-5 text-white hover:bg-brand-7"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
