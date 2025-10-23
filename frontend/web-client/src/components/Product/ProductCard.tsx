import "./product.css";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { imageSrc, name, price, imageAlt } = product;
  // Simple visual discount badge (demo only)
  const discount = product.id % 3 === 0 ? 25 : product.id % 2 === 0 ? 15 : 10;

  return (
    <div className="p-card" role="article" aria-label={name}>
      <div className="p-imageWrap">
        <img className="p-image" src={imageSrc} alt={imageAlt ?? name} />
        <div className="p-badge">-{discount}%</div>
      </div>
      <div className="p-info">
        <div className="p-title" title={name}>
          {name}
        </div>
        <div className="p-pricing">
          <span className="p-price">${price}</span>
          <span className="p-oldPrice">${Number(price) + 10}</span>
        </div>
      </div>
      <button className="p-addBtn" aria-label="Add to cart">
        Thêm
      </button>
    </div>
  );
}
