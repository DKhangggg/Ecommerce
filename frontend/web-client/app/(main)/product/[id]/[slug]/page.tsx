import Container from "@/components/Container";

import { Product } from "@/components/Product/ProductList";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductDetailWithStock } from "@/lib/api";
import { ProductDetailWithStockResponse, ProductResponse } from "@/types/api";
import Image from "next/image";

type Props = {
  params: {
    id: string;
    slug: string;
  };
};

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

export default async function ProductDetailPage({ params }: Props) {
  const { id } = params;
  if (!id) {
    return (
      <Container className="bg-brand-1 pt-12">
        <div className="text-red-500">Lỗi: URL không hợp lệ.</div>
      </Container>
    );
  }

  const detail = (await getProductDetailWithStock(id)) as ProductDetailWithStockResponse | null;
  if (!detail) {
    return (
      <Container className="bg-brand-1 pt-12">
        <div>Không tìm thấy sản phẩm</div>
      </Container>
    );
  }

  const product = mapBackendProductToUI(detail.product);

  return (
    <Container className="bg-brand-1 pt-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Image
            src={product.imageSrc}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg"
            unoptimized
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-brand-6">{product.name}</h1>
          <ProductDetailClient
            product={product}
            stockQuantity={detail?.stockQuantity??0 }
            stockStatus={detail.stockStatus}
          />
        </div>
      </div>
    </Container>
  );
}
