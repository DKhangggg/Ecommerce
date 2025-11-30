import { Product } from "@/components/Product/ProductList";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tai nghe Bluetooth cao cấp",
    price: 150.0, // Giá cơ bản
    imageSrc: "https://placehold.co/300x300/E8D59E/663333?text=Headphone",
    imageAlt: "Tai nghe xịn",
    slug: "tai-nghe-bluetooth-cao-cap",

    options: [
      { name: "color", label: "Màu sắc", values: ["Đen", "Trắng", "Đỏ"] },
      { name: "material", label: "Chất liệu", values: ["Da (Lux)", "Vải"] },
    ],
    variants: [
      { id: "v1", color: "Đen", material: "Da (Lux)", stock: 15, price: 150.0 },
      {
        id: "v2",
        color: "Trắng",
        material: "Da (Lux)",
        stock: 0,
        price: 150.0,
      },
      { id: "v3", color: "Đỏ", material: "Vải", stock: 8, price: 140.0 },
    ],
  },
  {
    id: 2,
    name: "Bàn phím cơ không dây",
    price: 120.5,
    imageSrc: "https://placehold.co/300x300/D9BBB0/663333?text=Keyboard",
    imageAlt: "Bàn phím cơ",
    slug: "ban-phim-co-khong-day",
    options: [
      { name: "color", label: "Màu sắc", values: ["Đen", "Trắng", "Đỏ"] },
      { name: "material", label: "Chất liệu", values: ["Da (Lux)", "Vải"] },
    ],
    variants: [
      // Đen + Da (Mặc định)
      { id: "v1", color: "Đen", material: "Da (Lux)", stock: 15, price: 150.0 },
      // Trắng + Da (Hết hàng)
      {
        id: "v2",
        color: "Trắng",
        material: "Da (Lux)",
        stock: 0,
        price: 150.0,
      },
      // Đỏ + Vải (Giá rẻ hơn)
      { id: "v3", color: "Đỏ", material: "Vải", stock: 8, price: 140.0 },
      // Đỏ + Da (Không có kết hợp này)
    ],
  },
  {
    id: 3,
    name: "Chuột quang chơi game RGB",
    price: 75.0,
    imageSrc: "https://placehold.co/300x300/AD9C8E/F6F6F6?text=Mouse",
    imageAlt: "Chuột gaming",
    slug: "chuot-quang-choi-game-rgb",
    options: [
      { name: "color", label: "Màu sắc", values: ["Đen", "Trắng", "Đỏ"] },
      { name: "material", label: "Chất liệu", values: ["Da (Lux)", "Vải"] },
    ],
    variants: [
      // Đen + Da (Mặc định)
      { id: "v1", color: "Đen", material: "Da (Lux)", stock: 15, price: 150.0 },
      // Trắng + Da (Hết hàng)
      {
        id: "v2",
        color: "Trắng",
        material: "Da (Lux)",
        stock: 0,
        price: 150.0,
      },
      // Đỏ + Vải (Giá rẻ hơn)
      { id: "v3", color: "Đỏ", material: "Vải", stock: 8, price: 140.0 },
      // Đỏ + Da (Không có kết hợp này)
    ],
  },
  {
    id: 4,
    name: "Màn hình cong 27-inch 4K",
    price: 450.0,
    imageSrc: "https://placehold.co/300x300/996600/FFFFFF?text=Monitor",
    imageAlt: "Màn hình 4K",
    slug: "man-hinh-cong-27-inch-4k",
    options: [
      { name: "color", label: "Màu sắc", values: ["Đen", "Trắng", "Đỏ"] },
      { name: "material", label: "Chất liệu", values: ["Da (Lux)", "Vải"] },
    ],
    variants: [
      // Đen + Da (Mặc định)
      { id: "v1", color: "Đen", material: "Da (Lux)", stock: 15, price: 150.0 },
      // Trắng + Da (Hết hàng)
      {
        id: "v2",
        color: "Trắng",
        material: "Da (Lux)",
        stock: 0,
        price: 150.0,
      },
      // Đỏ + Vải (Giá rẻ hơn)
      { id: "v3", color: "Đỏ", material: "Vải", stock: 8, price: 140.0 },
      // Đỏ + Da (Không có kết hợp này)
    ],
  },
  {
    id: 5,
    name: "Webcam Full HD 1080p",
    price: 45.0,
    imageSrc: "https://placehold.co/300x300/CC3300/FFFFFF?text=Webcam",
    imageAlt: "Webcam",
    slug: "webcam-full-hd-1080p",
    options: [
      { name: "color", label: "Màu sắc", values: ["Đen", "Trắng", "Đỏ"] },
      { name: "material", label: "Chất liệu", values: ["Da (Lux)", "Vải"] },
    ],
    variants: [
      // Đen + Da (Mặc định)
      { id: "v1", color: "Đen", material: "Da (Lux)", stock: 15, price: 150.0 },
      // Trắng + Da (Hết hàng)
      {
        id: "v2",
        color: "Trắng",
        material: "Da (Lux)",
        stock: 0,
        price: 150.0,
      },
      // Đỏ + Vải (Giá rẻ hơn)
      { id: "v3", color: "Đỏ", material: "Vải", stock: 8, price: 140.0 },
      // Đỏ + Da (Không có kết hợp này)
    ],
  },
];
