import Container from "@/components/Container";
import HomeBanner from "@/components/homeBanner";
import ProductList from "@/components/Product/ProductList";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <Container className=" bg-brand-1 flex flex-col gap-5 pt-6">
      <HomeBanner />
      <ProductList></ProductList>
      <ProductList></ProductList>
      <ProductList></ProductList>
      <ProductList></ProductList>
      <ProductList></ProductList>
    </Container>
  );
};

export default Home;
