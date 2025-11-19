import Container from "@/components/Container";
import HomeBanner from "@/components/homeBanner";
import ProductList, { Product } from "@/components/Product/ProductList";

interface HomeSection {
  id: string;
  title: string;
  products: Product[];
}

async function getHomeSections(): Promise<HomeSection[]> {
  return [
    {
      id: "sec_1",
      title: "Sản Phẩm Nổi Bật (Hot)",
      products: [
        {
          id: 1,
          name: "Tai nghe Bluetooth cao cấp",
          price: "150.00",
          imageSrc: "https://placehold.co/300x300/E8D59E/663333?text=Headphone",
          imageAlt: "Tai nghe xịn",
          slug: "tai-nghe-bluetooth-cao-cap",
        },
        {
          id: 2,
          name: "Bàn phím cơ không dây",
          price: "120.50",
          imageSrc: "https://placehold.co/300x300/D9BBB0/663333?text=Keyboard",
          imageAlt: "Bàn phím cơ",
          slug: "ban-phim-co-khong-day",
        },
        {
          id: 3,
          name: "Chuột quang chơi game RGB",
          price: "75.00",
          imageSrc: "https://placehold.co/300x300/AD9C8E/F6F6F6?text=Mouse",
          imageAlt: "Chuột gaming",
          slug: "chuot-quang-choi-game-rgb",
        },
        {
          id: 4,
          name: "Màn hình cong 27-inch 4K",
          price: "450.00",
          imageSrc: "https://placehold.co/300x300/996600/FFFFFF?text=Monitor",
          imageAlt: "Màn hình 4K",
          slug: "man-hinh-cong-27-inch-4k",
        },
        {
          id: 5,
          name: "Webcam Full HD 1080p",
          price: "45.00",
          imageSrc: "https://placehold.co/300x300/CC3300/FFFFFF?text=Webcam",
          imageAlt: "Webcam",
          slug: "webcam-full-hd-1080p",
        },
      ],
    },
    {
      id: "sec_2",
      title: "Xả kho giá rẻ",
      products: [
        {
          id: 1,
          name: "Tai nghe Bluetooth cao cấp",
          price: "150.00",
          imageSrc: "https://placehold.co/300x300/E8D59E/663333?text=Headphone",
          imageAlt: "Tai nghe xịn",
          slug: "tai-nghe-bluetooth-cao-cap",
        },
        {
          id: 2,
          name: "Bàn phím cơ không dây",
          price: "120.50",
          imageSrc: "https://placehold.co/300x300/D9BBB0/663333?text=Keyboard",
          imageAlt: "Bàn phím cơ",
          slug: "ban-phim-co-khong-day",
        },
        {
          id: 3,
          name: "Chuột quang chơi game RGB",
          price: "75.00",
          imageSrc: "https://placehold.co/300x300/AD9C8E/F6F6F6?text=Mouse",
          imageAlt: "Chuột gaming",
          slug: "chuot-quang-choi-game-rgb",
        },
        {
          id: 4,
          name: "Màn hình cong 27-inch 4K",
          price: "450.00",
          imageSrc: "https://placehold.co/300x300/996600/FFFFFF?text=Monitor",
          imageAlt: "Màn hình 4K",
          slug: "man-hinh-cong-27-inch-4k",
        },
        {
          id: 5,
          name: "Webcam Full HD 1080p",
          price: "45.00",
          imageSrc: "https://placehold.co/300x300/CC3300/FFFFFF?text=Webcam",
          imageAlt: "Webcam",
          slug: "webcam-full-hd-1080p",
        },
      ],
    },
    {
      id: "sec_3",
      title: "Dành riêng cho bạn",
      products: [],
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
