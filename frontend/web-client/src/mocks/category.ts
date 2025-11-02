import {Gem, Glasses, HatGlasses, LucideShirt, Shirt, Watch,} from "lucide-react";
import type {Category} from "../types/category";

export const MOCK_CATEGORIES: Category[] = [
    {
        id: 1,
        name: "Áo Nam",
        slug: "mens-shirts",
        icon: Shirt,
    },
    {
        id: 2,
        name: "Áo Nữ",
        slug: "womens-tops",
        icon: LucideShirt,
    },
    {
        id: 3,
        name: "Quần",
        slug: "pants",
        icon: LucideShirt,
    },
    {
        id: 4,
        name: "Phụ Kiện",
        slug: "accessories",
        icon: Watch,
    },
    {
        id: 5,
        name: "Kính Mắt",
        slug: "glasses",
        icon: Glasses,
    },
    {
        id: 6,
        name: "Trang Sức",
        slug: "jewelry",
        icon: Gem,
    },
    {
        id: 7,
        name: "Mũ Nón",
        slug: "hats",
        icon: HatGlasses,
    },
];


