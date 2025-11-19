"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ProductOptionType {
  name: string;
  label: string;
  values: string[];
}
interface Variant {
  id: string;
  stock: number;
  price: number;
  [key: string]: unknown;
}

interface VariantSelectorProps {
  options: ProductOptionType[];
  variants: Variant[];
  onChange: (selectedVariant: Variant | null) => void;
}

const VariantSelector = ({
  options,
  variants,
  onChange,
}: VariantSelectorProps) => {
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initialSelections: Record<string, string> = {};
    (options || []).forEach((opt) => {
      if (opt.values.length > 0) {
        initialSelections[opt.name] = opt.values[0];
      }
    });
    return initialSelections;
  });
  const handleSelect = useCallback((name: string, value: string) => {
    setSelections((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const selectedVariant = useMemo(() => {
    const matchedVariant = (variants || []).find((variant) => {
      let isMatch = true;

      // Duyệt qua tất cả các lựa chọn hiện tại (selections)
      for (const [key, value] of Object.entries(selections)) {
        // Nếu thuộc tính của variant không khớp với lựa chọn
        if (variant[key] !== value) {
          isMatch = false;
          break;
        }
      }
      return isMatch;
    });

    return matchedVariant || null;
  }, [selections, variants]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedVariant);
    }
  }, [selectedVariant, onChange]);

  const isOptionAvailable = useCallback(
    (targetType: string, targetValue: string): boolean => {
      const hypotheticalSelections = {
        ...selections,
        [targetType]: targetValue,
      };

      return variants.some((variant) => {
        let isMatch = true;

        for (const [key, value] of Object.entries(hypotheticalSelections)) {
          if (variant[key] !== value) {
            isMatch = false;
            break;
          }
        }

        return isMatch && variant.stock > 0;
      });
    },
    [selections, variants]
  );
  return (
    <div className="space-y-6">
      {(options || []).map((optType) => (
        <div key={optType.name}>
          <h3 className="text-sm font-medium mb-2 uppercase">
            {optType.label}:{" "}
            <span className="font-semibold text-amber-800">
              {selections[optType.name]}
            </span>
          </h3>

          <div className="flex gap-2 flex-wrap">
            {optType.values.map((value) => {
              const isSelected = selections[optType.name] === value;

              const isAvailable = isOptionAvailable(optType.name, value);
              const isDisabled = !isAvailable;

              return (
                <button
                  key={value}
                  onClick={() => handleSelect(optType.name, value)}
                  disabled={isDisabled} // <-- Kiểm tra chéo
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? "bg-amber-800 text-white border-amber-800"
                        : isDisabled
                        ? "bg-gray-100 text-gray-400 border-gray-200 line-through"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }
                    ${isDisabled && "cursor-not-allowed opacity-70"}
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="pt-2">
        {selectedVariant && selectedVariant.stock === 0 && (
          <p className="text-red-500 font-medium">
            Biến thể đã chọn đã hết hàng.
          </p>
        )}
        {selectedVariant && selectedVariant.stock > 0 && (
          <p className="text-green-600 font-medium">
            Còn {selectedVariant.stock} sản phẩm (Giá: {selectedVariant.price}{" "}
            VNĐ).
          </p>
        )}
        {!selectedVariant && (variants || []).length > 0 && (
          <p className="text-orange-500 font-medium">
            Vui lòng chọn một sự kết hợp hợp lệ.
          </p>
        )}
      </div>
    </div>
  );
};

export default VariantSelector;
