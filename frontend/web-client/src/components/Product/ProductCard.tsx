import type { Product } from "../../types/product";
type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { imageSrc, name, price } = product;
  return (
    <div className="w-48 h-64 border rounded-lg overflow-hidden grid grid-rows-[4fr_1fr]">
      <img src={imageSrc} />

      <div className="flex justify-around items-center p-2 bg-gray-50">
        <span className="font-medium text-sm">{name}</span>
        <span className="font-bold text-green-600">${price}</span>
      </div>
    </div>
  );
}
