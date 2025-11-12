import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <Container className=" bg-brand-4">
      <h1 className="text-5xl font-semibold">Home</h1>
      <Button variant="link">CLICK ME</Button>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non ratione
        laboriosam alias asperiores, dicta itaque sapiente officia quo
        reprehenderit aliquam eligendi accusantium incidunt iure labore
        praesentium. Provident esse cumque molestias, error eligendi dolor ad.
        Illum sequi odio asperiores assumenda, alias unde minus est,
        consequuntur ea magnam sapiente deleniti facere tenetur.
      </p>
    </Container>
  );
};

export default Home;
