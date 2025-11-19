import Container from "@/components/Container";

import { Product } from "@/components/Product/ProductList";
import QuantitySelector from "@/components/QuantitySelector";
import { MOCK_PRODUCTS } from "@/constants/product";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

async function getProductDetails(slug: string): Promise<Product | undefined> {
  const displaySlug = slug ? slug.toUpperCase() : "Không rõ";
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return product;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) {
    return (
      <Container className="bg-brand-1 pt-12">
        <div className="text-red-500">Lỗi: URL không hợp lệ.</div>
      </Container>
    );
  }
  const product = await getProductDetails(slug);
  if (!product) {
    return (
      <Container className="bg-brand-1 pt-12">
        <div>Không tìm thấy sản phẩm</div>
      </Container>
    );
  }

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
          <span className="text-3xl text-brand-7 font-semibold">
            ${product.price}
          </span>
          <p className="text-gray-600">
            Đây là mô tả chi tiết của sản phẩm. Bạn sẽ fetch nội dung này từ
            Sanity. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <QuantitySelector />
          <button className="bg-brand-5 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-brand-7 transition-colors w-full md:w-auto">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </Container>
  );
}
