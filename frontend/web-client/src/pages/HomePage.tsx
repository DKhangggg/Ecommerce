import {useEffect, useState} from "react";
import {mockBanners} from "../mocks/banner";
import {BannerList} from "../components/Banner/BannerList";
import type {banner} from "../types/banner";
import type {Product} from "../types/product";
import {mockProduct} from "../mocks/product";

export function HomePage() {
    const [banners, setBanners] = useState<banner[]>([]);
    const [isBannerLoading, setBannerLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isProductLoading, setProductLoading] = useState<boolean>(false);

    useEffect(() => {
        try {
            setBannerLoading(true);
            setTimeout(() => {
                setBanners(mockBanners);
                setBannerLoading(false);
            }, 300);
        } catch (error) {
            console.error("Error loading banners", error);
            setBannerLoading(false);
        }
    }, []);

    useEffect(() => {
        try {
            setProductLoading(true);
            setTimeout(() => {
                setProducts(mockProduct);
                setProductLoading(false);
            }, 300);
        } catch (error) {
            console.error("Error loading products", error);
            setProductLoading(false);
        }
    }, []);

    if (isBannerLoading && isProductLoading) {
        return <BannerList banners={banners} isLoading={isBannerLoading}/>;
    }

    return (
        <>
            <BannerList banners={banners}/>
            {/* <ProductList products={} title="Sản phẩm nổi bật"/>
            <ProductList products={} title="Hot deals"/>
            <ProductList products={} title="Bán chạy Nhất"/>
            <ProductList products={} title="Flash Sales"/>*/
            }
        </>
    );
}
