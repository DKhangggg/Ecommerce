import type {} from "../components/Banner/Banner";
import type { banner } from "../types/banner";

export const mockBanners: banner[] = [
  {
    id: 1,
    title: "Top sách bán chạy",
    description: "Rinh ngay deal hot",
    imageUrl: "https://cdn.tikicdn.com/media/banner-books.jpg",
    ctaLink: "/books",
  },
  {
    id: 2,
    title: "Siêu hội công nghệ",
    description: "Giá cực ưu đãi",
    imageUrl: "https://cdn.tikicdn.com/media/banner-tech.jpg",
    ctaLink: "/electronics",
  },
];
