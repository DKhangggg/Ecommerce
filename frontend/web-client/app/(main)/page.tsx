import Container from "@/components/Container";
import HomeBanner from "@/components/homeBanner";
import ProductList, { Product } from "@/components/Product/ProductList";
import { getHomepageData } from "@/lib/api";
import { ProductResponse } from "@/types/api";

interface HomeSection {
  id: string;
  title: string;
  products: Product[];
}

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

async function getHomeSections(): Promise<HomeSection[]> {
  const home = await getHomepageData();

  return [
    {
      id: "featured",
      title: "Sản Phẩm Nổi Bật (Hot)",
      products: (home.featuredProducts ?? []).map(mapBackendProductToUI),
    },
    {
      id: "cheap",
      title: "Xả kho giá rẻ",
      products: (home.newArrivals ?? []).map(mapBackendProductToUI),
    },
    {
      id: "for-you",
      title: "Dành riêng cho bạn",
      products: (home.bestSellers ?? []).map(mapBackendProductToUI),
    },
  ];
}

const Home = async () => {
  const sections = await getHomeSections();

  return (
    <Container className="bg-brand-1 flex flex-col gap-5 pt-6">
      <HomeBanner />

      {sections.map((section) => (
        <ProductList
          key={section.id}
          title={section.title}
          products={section.products}
        />
      ))}

      {sections.length === 0 && <p>Đang cập nhật sản phẩm...</p>}
    </Container>
  );
};

export default Home;
